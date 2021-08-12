let sliderValue = 180;
let texts = []
let lastValue;
let lastLastValue;
let n = 11;
let hovering = false;

var decToHex = function (dec) {
    var hex = Number(dec).toString(16);
    if (hex.length < 2) {
        hex = "0" + hex;
    }
    return hex;
};

var rgbToHex = function (rgb) {
    var hex = ""
    hex = "#" + decToHex(floor(rgb._array[0] * 255)) + decToHex(floor(rgb._array[1] * 255)) + decToHex(floor(rgb._array[2] * 255))
    return hex
};

var showSettings = function () {
    $("#settings").slideToggle(200);
}

function setup() {
    canvas = createCanvas(1287, 100)
    canvas.parent($(".colorDisplay")[0])
    // var handle = $("#handle")
    $("#hueSlider").slider({
        min: 0,
        max: 360,
        value: sliderValue,
        create: function () {
            display(sliderValue)
        },
        slide: function (event, ui) {

            display(int(ui.value))
        }
    }).position({
        my: "top",
        at: "top",
        of: "#sliderContainer"
    });
    $("#colorCount").slider({
        min:3,
        max:17,
        value:n,
        step:2,
        slide: function (event, ui) {
            n = int(ui.value)
            display(sliderValue)
        }
    })

    $(".ui-state-default,.ui-widget-content .ui-state-default").hover(
        function () {
            $(".ui-state-default,.ui-widget-content .ui-state-default")[0].style.boxShadow = "0 0 3px rgba(0, 0, 0, 1), inset 0 0 0 5px " + rgbToHex(bColor(sliderValue, map(0.1 * width / n, 0, width, 100, 0)))
        },
        function () {
            $(".ui-state-default,.ui-widget-content .ui-state-default")[0].style.boxShadow = "0 0 3px rgba(0, 0, 0, 1), inset 0 0 0 2px " + rgbToHex(bColor(sliderValue, map(0.1 * width / n, 0, width, 100, 0)))

        }
    )

}

function display(value) {

    $(".ui-state-default,.ui-widget-content .ui-state-default").css("background-color", "hsl(" + value + ", 76%,59%,100%)");
    sliderValue = int(value)

    for (let i = 0; i < texts.length; i++) {
        texts[i].remove()

    }
    for (let x = 0; x < width; x += width / n) {
        c = bColor(value, map(x + width / (n * 2), 0, width, 100, 0))
        fill(bColor(value, map(x + width / (n * 2), 0, width, 100, 0)))
        stroke(0, 255)
        if (floor(n / 2) == x / (width / n)) {
            stroke(255)
            rect(x + 1.5, 0.5, width / n - 3, height - 1)
        } else {
            rect(x, 0, width / n, height)
        }
        stroke(0)
        fill(0)

        var text = createP(rgbToHex(c))
        texts.push(text)
        text.position(canvas.position().x + x + width / (6 * n), canvas.position().y + height - 1)
        text.class("color-values")
        // console.log(rgbToHex(bColor(sliderValue, map(8.5 *width / (n), 0, width, 100, 0))))
    }

    for (let i = 0; i < $("a").length; i++) {
        $("a")[i].style.color = rgbToHex(bColor(sliderValue, 45))
    }

    for (let i = 0; i < $("p").length; i++) {
        $("p")[i].style.color = rgbToHex(bColor(sliderValue, 90))
    }

    document.getElementsByTagName("h1")[0].style.color = rgbToHex(bColor(sliderValue, 95))

    document.getElementsByTagName("body")[0].style.backgroundColor = rgbToHex(bColor(sliderValue, 0))
    document.getElementsByClassName("jumbotron")[0].style.backgroundColor = rgbToHex(bColor(sliderValue, 1))

}