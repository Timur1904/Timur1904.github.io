$(function () {
    $(".main__list").on("click","a", function (event) {
        event.preventDefault();
        var id  = $(this).attr('href'),
            top = $(id).offset().top;
        $('body,html').animate({scrollTop: top}, 1500);
    });

    $('.sertificate-slider').slick({
        infinite: true,
        speed: 700,
        slidesToShow: 4,
        slidesToScroll: 1,
        nextArrow: '<button id="next" type="button" class="btn btn-next"><img src="img/vector.png" alt="First image"></button>',
        prevArrow: '<button id="prev" type="button" class="btn btn-prev"><img src="img/vector.png" alt="First image"></button>',
        responsive: [{
                breakpoint: 1044,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 550,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 450,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });
    baguetteBox.run('.gallery', {
        // Custom options
    });

    // slick-slider

    $('.slider-feedback').slick({
        nextArrow: '<button id="prev" type="button" class="button-left"><img src="img/arrow.png" alt=""/></button>',
        prevArrow: '<button id="next" type="button" class="button-right"><img src="img/arrow.png" alt=""/></button>',
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        responsive: [{
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });




    function slowScroll(id) {
        var offset = 0;
        $('html, body').animate({
            scrollTop: $(id).offset().top - offset
        }, 500);
        return false;
    }


    var modal = document.getElementById('myModal');
    var btn = document.getElementById('myBtn');
    var span = document.getElementsByClassName("close")[0];

    btn.onclick = function () {
        modal.style.display = "flex";
        document.querySelector('html').classList.add('no-scroll');
        // console.log(document.getElementByTagName('html'));
    }
    span.onclick = function () {
        modal.style.display = "none";
        document.querySelector('html').classList.remove('no-scroll');

    }

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
            document.querySelector('html').classList.remove('no-scroll');
        }
    }


    const items = [{
            coord: [60.0103092, 30.2643176],
            text: 'Уточкина, 3',
            name: 'Уточкина, 3',
            class: 'active-address'
        },
        {
            coord: [59.919969, 30.341254],
            text: 'Марата, 82',
            name: 'Марата, 82',
            class: ''
        },
        {
            coord: [59.927473, 30.321069],
            text: 'Садовая, 40',
            name: 'Садовая, 40',
            class: ''
        },
    ];

    ymaps.ready(function () {
        const map = new ymaps.Map('map', {
            zoom: 13,
            center: items[0].coord,
            controls: [],
        });
        map.behaviors.disable('scrollZoom');

        items.forEach(n => map.geoObjects.add(new ymaps.Placemark(n.coord)));


        const buttons = document.querySelector('#buttons');

        buttons.innerHTML = items.map(n =>
            `<button class="${n.class}" data-coord="${JSON.stringify(n.coord)}" data-text="${n.text}">${n.name}</button>`
        ).join('');

        buttons.addEventListener('click', ({
            target: {
                dataset: {
                    coord,
                    text
                }
            }
        }) => {
            if (coord) {
                map.setCenter(JSON.parse(coord));
                map.balloon.open(JSON.parse(coord), text);
                var groupBtn = $(buttons).children('button');
                for (var i = 0; i < groupBtn.length; i++) {
                    var attr = '"' + $(groupBtn[i]).attr('data-coord') + '"';
                    var attr2 = JSON.stringify(coord);
                    if (attr2 == attr) {
                        $(groupBtn).removeClass('active-address');
                        $(groupBtn[i]).addClass('active-address');
                    }
                }
            }
        });
    });

    $("input[name='lead_phone']").mask("+7(000)000-00-00", {
        placeholder: "+7(___)___-__-__",
        clearIfNotMatch: true
    });

    $('form').on('submit', function () {
        event.preventDefault();
        var form = $(this).attr('class').split(' ')[0];
        var msg = "&form=" + form + "&" + $(this).serialize();
        $.ajax({
            type: 'POST',
            url: 'send.php',
            data: msg,
            dataType: 'json',
            success: function (data) {
                console.log(data);
                var formObj = $('.' + form);
                var f_h = $(formObj).children('.form_wrp').height();
                var f_w = $(formObj).children('.form_wrp').width();
                var content = "";

                $(formObj).height(f_h);
                $(formObj).width(f_w);

                content = "<div class='rezult' style='display:none;'>";
                content += "<div class='msg_submit_wrp'>";
                content += "<div class='msg_submit'>";
                content += "Сообщение отправлено.</br>Спасибо Вам <strong>" + data.lead_name + "</strong>, мы скоро свяжемся с Вами."
                content += "</div>";
                content += "</div>";
                content += "</div>";

                $(formObj).children('.form_wrp').after(content);
                $(formObj).children('.form_wrp').fadeOut();
                $(formObj).children('.rezult').fadeIn();
            },
            error: function (xhr, str) {
                console.log(xhr);
            }
        });
    });

    new WOW().init();

});