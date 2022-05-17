'use strict';

//Массив с данными для слайдера
const slidesArr = [
    {
        img: 'https://www.w3schools.com/howto/img_nature_wide.jpg',
        text: 'Caption Text 1'
    },
    {
        img: 'https://www.w3schools.com/howto/img_snow_wide.jpg',
        text: 'Caption Text 2'
    },
    {
        img: 'https://www.w3schools.com/howto/img_mountains_wide.jpg',
        text: 'Caption Text 3'
    }
];

//План действий:
//1. Создаю класс Slider
//2. В конструктор вставляю массив с данными из слайдера и селектор главного контейнера
//3. Пробую создать все нужные элементы динамически с помощью методов-функций класса, которые будут принимать ложь, правду, или значение задержки (для автопрокрутки) (пример слайдера с классом http://cccp-blog.com/koding/js-slajder)

class Slider {
    constructor (arraySlider, container){
        this.arraySlider = arraySlider;
        this.container = document.querySelector(container);
    }
    render({loop, navs,  pags, auto, delay}) {
        const container = this.container;//Получаем контейнер для всего слайдера
        const arr = this.arraySlider;//Массив с данными для слайдера

        //Слайдер
        const containerSlider = document.createElement('div');//Создаем контейнер слайдов внешний
        const slider = document.createElement('div');//Создаем контейнер слайдов внутренний
        containerSlider.classList.add('container-slider');//Добавляем для контейнера слайдов внешнего класс CSS
        slider.classList.add('slider');//Добавляем для контейнера слайдов внутреннего класс CSS
        container.append(containerSlider);//Добавляем в контейнер для всего слайдера контейнер слайдов внешний
        containerSlider.append(slider);//Добавляем во внешний  контейнер для слайдов внутренний

        //Счетчик
        const containerCounter = document.createElement('div');//Создаем контейнер для счетчика
        containerCounter.classList.add('container-counter');//Добавляем контейнеру для счетчика класс CSS
        container.append(containerCounter);////Добавляем в контейнер для всего слайдера контейнер для счетчика
        //Добавлем элементы счетчика с помощью HTML кода
        containerCounter.innerHTML = '<span class="slidenum">1</span><span>/</span ><span class ="slidetotal">10</span>';
        const slideNum = document.querySelector('.slidenum');//Номер слайда (из добавленного кода выше)
        const slideTotal = document.querySelector('.slidetotal');//Количество слайдов (из добавленного кода выше)

        let slideIndex = 1;//Индекс первого слайда по умолчанию
        let offset = 0;//Первоначальный отступ

        slider.style.transition = '0.5s all';//Плавное переключение анимации

        //Добавляем контейнер для точек переключения
        const indicator = document.createElement('div');
        indicator.style.cssText = 'height: 50px; width: 200px; opacity: 0.5; margin: 0px auto; display: flex; flex-direction: row; justify-content: center;';
        container.append(indicator);

        const dots = [];

        //Создаем элементы слайды. Берем данные из массива arr
        arr.forEach((el,i) => {
            let elSlide = document.createElement('div');//Создаем div для слайда
            elSlide.classList.add('slide');//Добавлем ему нужный класс из CSS
            //Наполняем контентом из массива arr
            elSlide.innerHTML = `
                <img src="${el.img}" alt="${el.text}">
                <p class="text">${el.text}</p>
            `;
            slider.append(elSlide);//Добавляем созданный элемент в контейнер для слайдов
            if (pags) {
                let dot = document.createElement('div');//Создаем div для точки переключения
                dot.style.cssText = 'height: 16px; width: 16px; background: grey; border-radius: 8px; margin: 10px; opacity: 0.5;';//Добавляем ему стили
                dot.setAttribute('data-slide-to', i+1);//Добавляем дата атрибут точке соответствующей номеру слайда
                //Активная точка
                if (i == 0) {
                    dot.style.opacity = 1;
                }
                indicator.append(dot);//Добавляем div точки в контейнер для точек переключения
                dots.push(dot);//Добавляем в массив точку, что бы потом его перебрать и навесить на каждую точку обработчик событий
            }         
        });

        console.log(dots);

        //Получаем данные по результату создания элементов слайда из массива
        const slides = document.querySelectorAll('.slide');//Все слайды
        const slideImg = document.querySelector('.slide img');//Картинка из первого слайда
        let slideWidth;
        //Функция ниже ждет загрузки картинки из первого слайда и присваивает значение slideWidth значения ширины, если не ждать загрузки то ширину показыает 0
        slideImg.onload = function() {
            slideWidth = slideImg.width;//Значение ширины картинки из слайдера
            container.style.width = `${slideWidth}px`;//Задаем ширину слайдера вместе с кнопками, стрелками счетчиком по ширине картинки из слайда
        };
        slider.style.width = 100 * slides.length + '%';

        //Задаем каждому слайду одинаковую ширину равную ширине картинки из слайда
        slides.forEach(slide => {
            slide.style.width = `${slideWidth}px`;//Задаем ширину слайда равную ширине картинки из слайда
        });
        // container.style.width = `${slideWidth}px`;//Задаем контейнеру для всего слайдера с кнопками, счетчиком и точками переключения ширину первого слайда

        slideTotal.textContent = `${slides.length}`;//Выводим в счетчик общее количество слайдов
        
         //Кнопки (если navs = true, то показываем кнопки и выполняем код по кликам на них)
         if (navs) {
            const containerBtn = document.createElement('div');//Создаем контейнер для кнопок
            containerBtn.classList.add('container-button');//Добавляем для контейнера кнопок класс CSS
            container.append(containerBtn);//Добавляем в контейнер для всего слайдера контейнер для кнопок
            //Добавлем кнопки с помощью HTML кода
            containerBtn.innerHTML = '<button class="prev"><img src="img/prev.png" alt="назад"></button><button class="next"><img src="img/next.png" alt="вперед"></button>';
            const prev = document.querySelector('.prev');//Кнопка назад (из добавленного кода выше)
            const next = document.querySelector('.next');//Кнопка вперед (из добавленного кода выше)

            next.addEventListener('click', () => {

                if (loop) {
                    if (offset == slideWidth * (slides.length-1)) {
                        offset = 0;
                    } else {
                        offset += slideWidth;
                    }
                    slider.style.transform = `translateX(-${offset}px)`;

                    if (slideIndex < slides.length) {
                        slideIndex = ++slideIndex;
                    slideNum.textContent = slideIndex;
                    } else {
                        slideIndex = 1;
                        slideNum.textContent = slideIndex;
                    }
        
                    dots.forEach(dot => dot.style.opacity = '.5');//Все точки прозрачные
                    dots[slideIndex - 1].style.opacity = 1;//Активная точка
                } else {
                    if (offset == slideWidth * (slides.length-1)) {
                        offset = offset;
                    } else {
                        offset += slideWidth;
                    }
                    slider.style.transform = `translateX(-${offset}px)`;

                    if (slideIndex < slides.length) {
                        slideIndex = ++slideIndex;
                    slideNum.textContent = slideIndex;
                    } else {
                        slideIndex = slideIndex;
                        slideNum.textContent = slideIndex;
                    }
        
                    dots.forEach(dot => dot.style.opacity = '.5');//Все точки прозрачные
                    dots[slideIndex - 1].style.opacity = 1;//Активная точка
                }
    
            });
    
            prev.addEventListener('click', () => {
    
                if (loop) {
                    if (offset == 0) {
                        offset = slideWidth * (slides.length-1);
                    } else {
                        offset -= slideWidth;
                    }   
                    slider.style.transform = `translateX(-${offset}px)`;

                    if (slideIndex <= 1) {
                        slideIndex = slides.length;
                        slideNum.textContent = slideIndex;
                    } else {
                        slideIndex = --slideIndex;
                        slideNum.textContent = slideIndex;
                    }
        
                    dots.forEach(dot => dot.style.opacity = '.5');//Все точки прозрачные
                    dots[slideIndex - 1].style.opacity = 1;//Активная точка
                } else {
                    if (offset == 0) {
                        offset = 0;
                    } else {
                        offset -= slideWidth;
                    }   
                    slider.style.transform = `translateX(-${offset}px)`;

                    if (slideIndex <= 1) {
                        slideIndex = slideIndex;
                        slideNum.textContent = slideIndex;
                    } else {
                        slideIndex = --slideIndex;
                        slideNum.textContent = slideIndex;
                    }
                    dots.forEach(dot => dot.style.opacity = '.5');//Все точки прозрачные
                    dots[slideIndex - 1].style.opacity = 1;//Активная точка
                }
        
            });

            if (auto) {
                      //Автопереключение слайдера
                      let int = setInterval(() => {
                        next.click();
                    }, 5000);
    
                    //Отключение автопрокрутки слайдера при наведении на него курсора мыши
                    container.addEventListener ('mouseover', () => {
                        clearInterval(int);
                    });
    
                    ////Включение автопрокрутки слайдера при убирании с него курсора мыши
                    container.addEventListener ('mouseleave', () => {
                        int = setInterval(() => {
                            next.click();
                        }, 5000);
                    });
            } else {
                      //Автопереключение слайдера
                      let int = setInterval(() => {
                        next.click();
                    }, delay * 1000);
    
            }
              

        }


        dots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                const slideTo = e.target.getAttribute('data-slide-to');//Обращаемся к слайду с определенным атрибутом, то есть рузультат будет от 1 до 3
                console.log(slideTo);//Проверил в консоли

                slideIndex = slideTo;//Устанавливаем индекс слайда равный его дата атрибуту
                slideNum.textContent = slideIndex;
                
                offset = slideWidth * (slideTo - 1);//Определем отступ на который перемещается слайд

                slider.style.transform = `translateX(-${offset}px)`;//Перемещаемся до слайда

                dots.forEach(dot => dot.style.opacity = '.5');//Все точки прозрачные
                dots[slideIndex - 1].style.opacity = 1;//Активная точка

            });
        });


    }
}

const slider = new Slider(slidesArr,'.container').render({
    loop: true, 
    navs: true,
    pags: true,
    auto: false,
    delay: 3,
});











