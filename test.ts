WSTouchPiano.TP_ShowRGB(
WSTouchPiano.TP_SetRGB(158, 119, 150),
WSTouchPiano.TP_SetColor(RGB_COLOR.GREEN),
2643,
22197
)
WSTouchPiano.TP_PlayMusic(262, music.beat(BeatFraction.Whole))
WSTouchPiano.TP_PlayMusic(294, music.beat(BeatFraction.Whole))
WSTouchPiano.TP_PlayMusic(330, music.beat(BeatFraction.Whole))
WSTouchPiano.TP_PlayMusic(349, music.beat(BeatFraction.Whole))
WSTouchPiano.TP_PlayMusic(392, music.beat(BeatFraction.Whole))
WSTouchPiano.TP_PlayMusic(440, music.beat(BeatFraction.Whole))
WSTouchPiano.TP_PlayMusic(494, music.beat(BeatFraction.Whole))
basic.forever(function () {
    WSTouchPiano.TP_PlayPiano()
})
