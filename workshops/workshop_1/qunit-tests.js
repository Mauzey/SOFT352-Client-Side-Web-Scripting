function rgb2hex(color) {
    digits = /(.*?)rgb\((\d+), (\d+), (\d+)\)/.exec(color);
    red = parseInt(digits[2],10);
    green = parseInt(digits[3],10);
    blue = parseInt(digits[4],10);
    rgb = blue | (green << 8) | (red << 16);
    if(red == 0){
        return digits[1] + '#00' + rgb.toString(16);
    }else{
        return digits[1] + '#' + rgb.toString(16);
    }
}

// Tests for structure/html
QUnit.test("#Unit test 1 testing page title", function(assert){
    assert.ok($(document).attr('title').indexOf("Disco Inferno")!=-1,"checking that the page title is Disco Inferno");
});

QUnit.test("#Unit test 2 testing div element presence", function(assert){
    // console.log("Number of divs " + $("div").length)
    assert.ok($("div").length>8, "checking that an element of type div has been added");
});

QUnit.test("#Unit test 3 testing main class type", function(assert){
    assert.equal($(".main")[0].tagName, "DIV", "checking that the \'main\' class element is a div");
});

QUnit.test("#Unit test 4 testing h1 element presence", function(assert){
    assert.ok($("h1").length>1, "checking that an element of type h1 has been added");
});

QUnit.test("#Unit test 5 testing light class type", function(assert){
    assert.equal($(".light")[0].tagName, "DIV", "checking that the \'light\' class element is a div");
});

QUnit.test("#Unit test 6 testing button element presence", function(assert){
    console.log("Number of buttons " + $("button").length)
    assert.ok($("button").length>4, "checking that an element of type button has been added");
});

QUnit.test("#Unit test 7 testing button text", function(assert){
    assert.ok($("button").text().indexOf("Burn!")!=-1, "checking that the button has the text 'Burn!'");
});

// Tests for style/css
QUnit.test("#Unit test 8a testing main div width", function(assert){
    assert.ok(parseInt($(".main").css("width").replace('px',''),10)-250<1.0,"checking that the width is no more than 1.0 away from 250.");
    assert.ok(parseInt($(".main").css("width").replace('px',''),10)-250>-1.0,"checking that the width is no less than -1.0 away from 250.");
});

QUnit.test("#Unit test 8b testing main div color", function(assert){
    assert.equal(rgb2hex($(".main").css("color")),"#202020","checking that the color is #202020.");
});

QUnit.test("#Unit test 8c testing main div background color", function(assert){
    assert.equal(rgb2hex($(".main").css("background-color")),"#d0d0d0","checking that the background color is #d0d0d0.");
});

QUnit.test("#Unit test 9a testing button width", function(assert){
    assert.equal($(".light").css("height"),"50px","checking that light div height is 50px.");
});

QUnit.test("#Unit test 9b testing light div color", function(assert){
    assert.equal(rgb2hex($(".light").css("background-color")),"#00ffff","checking that the light div background color is #00ffff");
});

QUnit.test("#Unit test 10a testing button width", function(assert){
    assert.equal($("#burn").css("width"),"150px","checking that button width is 150px.");
});

QUnit.test("#Unit test 10b testing button font", function(assert){
    assert.equal($("#burn").css("font-weight"),"700","checking that button uses font 'bold'.");
});

// Tests for behavior/JavaScript
QUnit.test("#Unit test 11a testing the behavior of first click on the \'Burn!\' button", function(assert){
    original_bgcolor = $(".light").css("background-color");
    $('.light').css('background-color','#00ffff');
    $('#burn').trigger('click');
    assert.equal(rgb2hex($(".light").css("background-color")),"#ffff00","checking that the \'Burn!\' button changes the light color from cyan to yellow");
    $('.light').css('background-color',original_bgcolor);
});

QUnit.test("#Unit test 11b testing the behavior of second click on the \'Burn!\' button", function(assert){
    original_bgcolor = $(".light").css("background-color");
    $('.light').css('background-color','#ffff00');
    $('#burn').trigger('click');
    assert.equal(rgb2hex($(".light").css("background-color")),"#ff00ff","checking that the \'Burn!\' button changes the light color from yellow to magenta");
    $('.light').css('background-color',original_bgcolor);
});

QUnit.test("#Unit test 11c testing the behaviour of third click on the \'Burn!\' button", function(assert){
    original_bgcolor = $(".light").css("background-color");
    $('.light').css('background-color','#ff00ff');
    $('#burn').trigger('click');
    assert.equal(rgb2hex($(".light").css("background-color")),"#00ffff","checking that the \'Burn!\' button changes the light color from magenta to cyan");
    $('.light').css('background-color',original_bgcolor);
});

QUnit.test("#Unit test 12a testing the behavior of key press 'c'", function(assert){
    original_bgcolor = $(".light").css("background-color");
    $('.light').css('background-color',"#ffffff");
    $("body").trigger( $.Event( "keypress", { keyCode: 99 } ) ); // 'c'
    assert.equal(rgb2hex($(".light").css("background-color")),"#00ffff","checking that pressing 'c' turns the light div cyan");
    $('.light').css('background-color',original_bgcolor);
});

QUnit.test("#Unit test 12b testing the behavior of key press 'y'", function(assert){
    original_bgcolor = $(".light").css("background-color");
    $('.light').css('background-color',"#ffffff");
    $("body").trigger( $.Event( "keypress", { keyCode: 121 } ) ); // 'y'
    assert.equal(rgb2hex($(".light").css("background-color")),"#ffff00","checking that pressing 'y' turns the light div yelow");
    $('.light').css('background-color',original_bgcolor);
});

QUnit.test("#Unit test 12c testing the behaviour of key press 'm'", function(assert){
    original_bgcolor = $(".light").css("background-color");
    $('.light').css('background-color',"#ffffff");
    $("body").trigger( $.Event( "keypress", { keyCode: 109 } ) ); // 'm'
    assert.equal(rgb2hex($(".light").css("background-color")),"#ff00ff","checking that pressing 'm' turns the light div magenta");
    $('.light').css('background-color',original_bgcolor);
});
