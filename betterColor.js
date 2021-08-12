function bColor(hue, brightness) {
    let h = 0
    let s = 0
    let b = 0

    let lightHue = 50
    let darkHue = 260
    let maxDistance = 90

    if (brightness < 50) {
        let t = map(brightness, 0, 50, 0, 1)

        let maxHue = 0;

        if (hue < lightHue) {
            maxHue = hue - min(maxDistance,darkHue-hue)
        } else if (hue < darkHue) {
            maxHue = hue + min(maxDistance, darkHue - hue)
        } else {
            maxHue = hue - min(maxDistance, hue - darkHue)
        }



        h = lerp(maxHue, hue, t)
        s = lerp(35, 70, t)
        b = lerp(15, 90, t)
    } else {
        let t = map(brightness, 50, 100, 0, 1)
        let maxHue = 0;
        if (hue < lightHue) {
            maxHue = hue + min(lightHue-hue, maxDistance)
        } else if (hue < darkHue) {
            maxHue = hue - min(maxDistance, hue - lightHue)
        } else {
            maxHue = hue + min(maxDistance, 360 - hue + lightHue)
        }

        h = lerp(hue, maxHue, t)
        s = lerp(70, 10, t)
        b = lerp(90, 98, t)
    }
    h = ceil(h*1)/1
    s = ceil(s)
    b = ceil(b)
    if (h > 360) {
        h %= 360
    } else if (h < 0) {
        h += 360
    }
    
    return color('hsb(' + h + ', ' + s + '%, ' + b + '%)')
}