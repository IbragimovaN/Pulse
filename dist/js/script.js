$(document).ready(function(){
    $('.carousel__inner').slick({
        speed: 300,
        adaptiveHeight: true,
        prevArrow:'<button type="button" class="slick-prev"> <img src="../icons/block4 left-btn.png" alt="arrow"> </button>',
        nextArrow:'<button type="button" class="slick-next"><img src="../icons/block4 right-btn.png" alt="arrow"></button>',
        responsive: [{
            breakpoint: 768,
            settings: {
                dots: true,
                dotsClass: 'slick-dots',
                arrows: false
                
            }
        }]
    });
   

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
      });

    function toggleSlide (classItem){
        $(classItem).each(function(i){
            $(this).on('click', function(e){
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            })
        });
    };
    
    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

    $('[data-modal=consultation]').on('click', function(){
        $('.overlay, #consultation').fadeIn();
    });
    $('.modal__close').on('click', function(){
        $('.overlay, #consultation, #thanks, #order').fadeOut()
    });
    $('.button_mini').each(function(i){
        $(this).on('click', function(){
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay,#order').fadeIn();
        });
    });

   
    function validateForms (form) {
        $(form).validate({
            rules:{
                name:{
                    required: true,
                    minlength: 2
                },
                phone:"required",
                email:{
                    required: true,
                    email: true
                }
            },
            messages:{
                name: {
                    required: "Пожалуйста, введите свое имя",
                    minlength: jQuery.validator.format("Имя должно содержать минимум {0} символа!")
                },
                email:{
                    required: "Пожалуйста, введите email адрес",
                    email: "Не валидный email адрес"
                },
                phone:"Пожалуйста, введите нoмер телефона"
            }
        });

    }

    validateForms('#consultation-form');
    validateForms('#consultation form');
    validateForms('#order form');
    
    $('input[name=phone]').mask("+7 (999) 999-99-99");

    $('form').submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');

            $('form').trigger('reset');
        });
        return false;
    });

    $(window).scroll(function(){
        if($(this).scrollTop() > 1600){
            $('.pageup').fadeIn();
        }else{
            $('.pageup').fadeOut();
        }

    });

    const anchors = document.querySelectorAll('a[href^="#"]');
    for(let anchor of anchors){
    anchor.addEventListener('click', function(e){
        e.preventDefault();
        let blockID = anchor.getAttribute('href')
        document.querySelector('' + blockID).scrollIntoView({
            behavior: "smooth",
            block: "start"
        })
    })
}
    new WOW().init();

        
});





// // табы
// const tabsBtn = document.querySelectorAll('.catalog__tab')
// const tabsItem = document.querySelectorAll('.catalog__content')

// tabsBtn.forEach(function(item){
//     item.addEventListener('click', function(){
//         let currentBtn = item
//         let tabID = currentBtn.getAttribute('data-tab');
//         let currentTab = document.querySelector(tabID)
//         tabsBtn.forEach(function(item){
//             item.classList.remove('catalog__tab_active')
//         })
//         currentBtn.classList.add('catalog__tab_active')
//         tabsItem.forEach(function(item){
//             item.classList.remove('catalog__content_active')
//         })
//         currentTab.classList.add('catalog__content_active')
//     })
// })

// ссылки
// const btnMore = document.querySelectorAll('.catalog-item__link');
// const btnBack = document.querySelectorAll('.catalog-item__back');

// btnMore.forEach(function (item){
//     item.addEventListener('click', function (e){
//         e.preventDefault();
//         const catalogItemContent = item.closest('.catalog-item__content');
//         catalogItemContent.classList.toggle('catalog-item__content_active');
//         const catalogItemWrapper = catalogItemContent.closest('.catalog-item__wrapper');
//         const catalogItemList = catalogItemWrapper.querySelector('.catalog-item__list');
//         catalogItemList.classList.toggle('catalog-item__list_active')
//     })
// })
// btnBack.forEach(function (item){
//     item.addEventListener('click', function (e){
//         e.preventDefault();
//         const catalogItemList = item.closest('.catalog-item__list');
//         catalogItemList.classList.toggle('catalog-item__list_active')
//         const catalogItemWrapper = catalogItemList.closest('.catalog-item__wrapper');
//         const catalogItemContent = catalogItemWrapper.querySelector('.catalog-item__content');
//         catalogItemContent.classList.toggle('catalog-item__content_active');
//     })
// })



// модальное окно

// const mwBtn = document.querySelectorAll('.mw');
// const modalWindow = document.querySelector('.modal-window');
// const btnClose = document.querySelector('.modal-window__btn');


// mwBtn.forEach(function(item){
//     item.addEventListener('click',function(){
//         modalWindow.classList.remove('hidden')
//     })
// });
// btnClose.addEventListener('click', function(){
//     modalWindow.classList.add('hidden')
// })
