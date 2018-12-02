/*****************************************************************************
* | File      	:	WSTouchPiano
* | Author      :   Waveshare team
* | Function    :	Contorl Piano  
* | Info        :
*----------------
* |	This version:   V1.1
* | Date        :   2018-05-22
* | Info        :   Improve misidentification
*
* | Basic       :   2018-01-22
* | Info        :   Basic version
******************************************************************************/
/**
 * The piano key corresponds to the touch screen TPvalue.
 */
enum TP_PIANO {
    None = 0x0000,
    C = 0x0001,
    bD = 0x0002,
    D = 0x0004,
    bE = 0x0008,

    E = 0x0010,
    F = 0x0020,
    bG = 0x0040,
    G = 0x0080,

    bA = 0x0100,
    A = 0x0200,
    bB = 0x0400,
    B = 0x0800,

    C1 = 0x1000
}

/**
 * RGBLED order.
 */
enum RGB_LED {
    RGB_L1 = 0,
    RGB_L2 = 1,
    RGB_L3 = 2,
    RGB_L4 = 3
}

/**
 * Well known colors for a NeoPixel strip
 */
enum RGB_COLOR {
    //% block=red
    RED = 0xFF0000,
    //% block=orange
    ORANGE = 0xFFA500,
    //% block=yellow
    YELLOW = 0xFFFF00,
    //% block=green
    GREEN = 0x00FF00,
    //% block=blue
    BLUE = 0x0000FF,
    //% block=indigo
    INDIGO = 0x4b0082,
    //% block=violet
    VIOLET = 0x8a2be2,
    //% block=purple
    PURPLE = 0xFF00FF,
    //% block=white
    WHITE = 0xFFFFFF
}

/**
 * Operate the function of the piano board.
 */
//% weight=20 color=#3333FF icon="\uf001"
namespace WSTouchPiano {
    //% blockId=tp_press 
    //% block="Pey|%index|is pressed"
    //% weight=100
    export function TP_Press(index: TP_PIANO): boolean {
        let TPval = pins.i2cReadNumber(0x57, NumberFormat.UInt16BE);

        let keyup = 1;
        let press = false;
        if (keyup && TPval != TP_PIANO.None) {
            if (TPval != TP_PIANO.None) {
                keyup = 0;
                let temp = TPval >> 8;
                TPval = (TPval << 8) | temp;
                if (index != 0) {
                    if (TPval & index) {
                        press = true;
                    } else {
                        press = false;
                    }
                } else {
                    if (TPval == 0) {
                        press = true;
                    } else {
                        press = false;
                    }
                }
            }
        }
        return press;
    }

	/**
	* Gets the RGB TPvalue of a known color
	*/
    //% blockId="TP_SetColor" block="Set Color%Color"
    //% weight=80 blockGap=8
    export function TP_SetColor(Color: RGB_COLOR): number {
        return Color;
    }

    //% weight=85
    //% blockId="TP_SetRGB" block="red %red|green %green|blue %blue"
    export function TP_SetRGB(red: number, green: number, blue: number): number {
        return ((red & 0xFF) << 16) | ((green & 0xFF) << 8) | (blue & 0xFF);
    }

    export function TP_SetRandomRGB(): number {
        return TP_SetRGB(Math.random(256), Math.random(256), Math.random(256));
    }

	/**
	* Display RGB color.
	*/
    //% blockId==TP_ShowRGB block="Set |LED1_Color: %Color1|LED2_Color: %Color2|LED3_Color: %Color3|LED4_Color: %Color4"
    //% weight=80
    export function TP_ShowRGB(LED1_Color: number, LED2_Color: number,
        LED3_Color: number, LED4_Color: number): void {
        let rgb_id = 0;
        let strip = neopixel.create(DigitalPin.P1, 4, NeoPixelMode.RGB);
        strip.setBrightness(20);
        strip.setPixelColor(0, LED1_Color);
        strip.setPixelColor(1, LED2_Color);
        strip.setPixelColor(2, LED3_Color);
        strip.setPixelColor(3, LED4_Color);
        strip.show();
    }


	/**
	 * Plays a tone through pin ``P0`` for the given duration.
	 * @param frequency pitch of the tone to play in Hertz (Hz)
	 * @param ms tone duration in milliseconds (ms)
	 */
    //% help=music/play-tone weight=70
    //% blockId=TP_PlayMusic block="Play |Music %note=device_note|for %duration=device_beat" blockGap=8
    //% parts="headphone"
    //% useEnumTPval=1
    export function TP_PlayMusic(frequency: number, ms: number): void {
        pins.analogPitch(frequency, ms);
    }

    /**
    * Play the notes
    */
    let play = 0;
    //% blockId==TP_PlayPiano" block="Play Piano"
    //% weight=60
    export function TP_PlayPiano(): void {
        //pins.analogSetPitchPin(AnalogPin.P0);
        let TPval = pins.i2cReadNumber(0x57, NumberFormat.UInt16BE);
        let temp = TPval >> 8;
        TPval = (TPval << 8) | temp;

        let Color = TP_SetRandomRGB();
        if ((TPval & play) != 0) {
            TPval = TPval & play;
        } else if (TPval & TP_PIANO.C) {
            TP_ShowRGB(Color, Color, Color, Color);
            music.ringTone(262);
        } else if (TPval & TP_PIANO.bD) {
            TP_ShowRGB(Color, Color, Color, Color);
            music.ringTone(277);
        } else if (TPval & TP_PIANO.D) {
            TP_ShowRGB(Color, Color, Color, Color);
            music.ringTone(294);
        } else if (TPval & TP_PIANO.bE) {
            TP_ShowRGB(Color, Color, Color, Color);
            music.ringTone(311);
        } else if (TPval & TP_PIANO.E) {
            TP_ShowRGB(Color, Color, Color, Color);
            music.ringTone(330);
        } else if (TPval & TP_PIANO.F) {
            TP_ShowRGB(Color, Color, Color, Color);
            music.ringTone(349);
        } else if (TPval & TP_PIANO.bG) {
            TP_ShowRGB(Color, Color, Color, Color);
            music.ringTone(370);
        } else if (TPval & TP_PIANO.G) {
            TP_ShowRGB(Color, Color, Color, Color);
            music.ringTone(392);
        } else if (TPval & TP_PIANO.bA) {
            TP_ShowRGB(Color, Color, Color, Color);
            music.ringTone(415);
        } else if (TPval & TP_PIANO.A) {
            TP_ShowRGB(Color, Color, Color, Color);
            music.ringTone(440);
        } else if (TPval & TP_PIANO.bB) {
            TP_ShowRGB(Color, Color, Color, Color);
            music.ringTone(466);
        } else if (TPval & TP_PIANO.B) {
            TP_ShowRGB(Color, Color, Color, Color);
            music.ringTone(494);
        } else if (TPval & TP_PIANO.C1) {
            TP_ShowRGB(Color, Color, Color, Color);
            music.ringTone(523);
        } else if (TPval == TP_PIANO.None) {
            TP_ShowRGB(0, 0, 0, 0);
            music.ringTone(0);
        }
        if (TPval != 0xffff)
            play = TPval;
    }
}
