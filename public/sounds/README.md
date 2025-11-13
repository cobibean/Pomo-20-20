# Audio Files for Pomo 20-20 Timer

Place the following audio files in this directory:

## Required Audio Files

1. **`lofi-ender.wav`** - Plays when the 25-minute focus timer ends
2. **`GIO_HEAL_gong_short.wav`** - Plays when the 20-second eye break ends
3. **`BOS_BC_Gong_Long_Shot_Black_Cm.wav`** - Plays when the 5-minute rest break ends

## Audio Guidelines

- **Format**: WAV files work best for consistent playback
- **Length**: Keep sounds short (1-3 seconds) for pleasant notifications
- **Volume**: Ensure consistent volume levels across all sounds
- **Quality**: Use high-quality audio for the best experience

## How It Works

The timer plays different sounds based on which phase just ended:
- Focus phase ends → `lofi-ender.wav`
- Eye break ends → `GIO_HEAL_gong_short.wav`
- Rest break ends → `BOS_BC_Gong_Long_Shot_Black_Cm.wav`

Audio is initialized on the first user interaction (click, keypress, or touch) due to browser autoplay policies.
