import { ref, computed, watch, reactive } from 'vue';
import { useTasks } from './useTasks';

const defaultModes = {
    work: 25 * 60,
    short: 5 * 60,
    long: 15 * 60,
};

// Shared state
const modes = reactive({ ...defaultModes });
const savedModes = localStorage.getItem('focus-flow-modes');
if (savedModes) {
    Object.assign(modes, JSON.parse(savedModes));
}

export function useTimer() {
    const mode = ref('work');
    const timeLeft = ref(modes[mode.value]);
    const isRunning = ref(false);
    const sessions = ref(parseInt(localStorage.getItem('focus-flow-sessions') || '0'));
    let interval = null;

    const { currentTaskId, incrementTaskSession } = useTasks();

    const formattedTime = computed(() => {
        const minutes = Math.floor(timeLeft.value / 60);
        const seconds = timeLeft.value % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    });

    const setMode = (newMode) => {
        mode.value = newMode;
        reset();
        localStorage.setItem('focus-flow-mode', newMode);
    };

    const updateDurations = (newDurations) => {
        Object.assign(modes, newDurations);
        localStorage.setItem('focus-flow-modes', JSON.stringify(modes));
        if (!isRunning.value) {
            reset();
        }
    };

    const isMuted = ref(localStorage.getItem('focus-flow-muted') === 'true');
    const selectedSound = ref(localStorage.getItem('focus-flow-sound') || 'bell');

    // Available completion sounds
    const sounds = {
        bell: { name: 'Bell', frequencies: [800, 1000, 1200] },
        chime: { name: 'Chime', frequencies: [523, 659, 784, 1047] },
        digital: { name: 'Digital', frequencies: [1200, 1400, 1600, 1200] },
        gentle: { name: 'Gentle', frequencies: [440, 554, 659] }
    };

    const playCompletionSound = async () => {
        if (isMuted.value) return;
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;

        const ctx = new AudioContext();

        // Resume audio context if suspended (happens in background tabs)
        if (ctx.state === 'suspended') {
            await ctx.resume();
        }

        const sound = sounds[selectedSound.value];
        let time = ctx.currentTime;

        sound.frequencies.forEach((freq, index) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, time);

            gain.gain.setValueAtTime(0, time);
            gain.gain.linearRampToValueAtTime(0.3, time + 0.05);
            gain.gain.exponentialRampToValueAtTime(0.01, time + 0.4);

            osc.start(time);
            osc.stop(time + 0.4);

            time += 0.15;
        });
    };

    const setSound = (soundId) => {
        selectedSound.value = soundId;
        localStorage.setItem('focus-flow-sound', soundId);
    };

    const previewSound = async () => {
        // Always play preview sound regardless of mute setting
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;

        const ctx = new AudioContext();

        // Resume audio context if suspended
        if (ctx.state === 'suspended') {
            await ctx.resume();
        }

        const sound = sounds[selectedSound.value];
        let time = ctx.currentTime;

        sound.frequencies.forEach((freq, index) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, time);

            gain.gain.setValueAtTime(0, time);
            gain.gain.linearRampToValueAtTime(0.3, time + 0.05);
            gain.gain.exponentialRampToValueAtTime(0.01, time + 0.4);

            osc.start(time);
            osc.stop(time + 0.4);

            time += 0.15;
        });
    };

    const toggleMute = () => {
        isMuted.value = !isMuted.value;
        localStorage.setItem('focus-flow-muted', isMuted.value);
    };

    const start = () => {
        if (isRunning.value) return;
        isRunning.value = true;
        interval = setInterval(() => {
            timeLeft.value--;
            if (timeLeft.value <= 0) {
                finish();
            }
        }, 1000);
    };

    const pause = () => {
        clearInterval(interval);
        isRunning.value = false;
    };

    const reset = () => {
        pause();
        timeLeft.value = modes[mode.value];
    };

    const finish = () => {
        pause();
        if (mode.value === 'work') {
            sessions.value++;
            localStorage.setItem('focus-flow-sessions', sessions.value.toString());

            // Increment session count for current task
            if (currentTaskId.value) {
                incrementTaskSession(currentTaskId.value);
            }
        }

        // Play completion sound
        playCompletionSound();
        sendNotification();

        reset();
    };

    // Initialize from local storage if available
    const savedMode = localStorage.getItem('focus-flow-mode');
    if (savedMode && modes[savedMode]) {
        mode.value = savedMode;
        timeLeft.value = modes[savedMode];
    }

    // Notification logic
    const notificationPermission = ref(Notification.permission);

    const requestNotificationPermission = async () => {
        if (!('Notification' in window)) {
            alert('This browser does not support desktop notifications');
            return;
        }

        const permission = await Notification.requestPermission();
        notificationPermission.value = permission;
    };

    const sendNotification = async () => {
        if (notificationPermission.value === 'granted') {
            try {
                // Try to use Service Worker registration first (better for PWAs)
                if ('serviceWorker' in navigator) {
                    const registration = await navigator.serviceWorker.ready;
                    if (registration) {
                        await registration.showNotification('FocusFlow', {
                            body: 'Timer completed!',
                            icon: '/icon-192.png',
                            vibrate: [200, 100, 200]
                        });
                        return;
                    }
                }
            } catch (e) {
                console.error('SW notification failed, falling back:', e);
            }

            // Fallback to standard API
            new Notification('FocusFlow', {
                body: 'Timer completed!',
                icon: '/icon-192.png'
            });
        }
    };

    return {
        timeLeft,
        formattedTime,
        isRunning,
        start,
        pause,
        reset,
        mode,
        setMode,
        sessions,
        MODES: modes,
        isMuted,
        toggleMute,
        updateDurations,
        selectedSound,
        sounds,
        setSound,
        previewSound,
        notificationPermission,
        requestNotificationPermission,
        sendNotification // Expose for testing
    };
}
