// 轮播图
var mySwiper = new Swiper('.mainSwiper', {
  direction: 'horizontal', // 垂直切换选项
  autoplay: {
    delay: 3000, //1秒切换一次
    disableOnInteraction: false,
  },
  loop: true, // 循环模式选项
  // 如果需要分页器
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  // 如果需要前进后退按钮
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
})
for (i = 0; i < mySwiper.pagination.bullets.length; i++) {
  mySwiper.pagination.bullets[i].onmouseover = function () {
    this.click();
  };
}
// 轮播图

// 轮播图按键显示隐藏
$('.mainSwiper').hover(() => {
  $('.mainSwiper .swiper-button-prev').stop().animate({
    left: '0px',
    opacity: '0.7',
  }, "fast");
  $('.mainSwiper .swiper-button-next').stop().animate({
    right: '0px',
    opacity: '0.7',
  }, "fast");
}, () => {
  $('.mainSwiper .swiper-button-prev').stop().animate({
    left: '-34px',
    opacity: '0.2',
  }, "fast");
  $('.mainSwiper .swiper-button-next').stop().animate({
    right: '-34px',
    opacity: '0.2',
  }, "fast");
})
// 轮播图按键显示隐藏

// 类别栏显示隐藏
$('.category>div').hover(function () {
  $(this).find('.double').show();
  // console.log(this);
}, function () {
  $(this).find('.double').hide();
});

$('.closeDouble').on('click', function () {
  $(this).parent().hide();
  console.log();
})
// 类别栏显示隐藏


//导入类别栏
$.ajax({
  url: "../data/double.json",
  type: "get",
  data: " ",
  dataType: "json",
  success: function (json) {
    $.each(json, function (index, val) {
      // console.log(index);
      $.each(Object.keys(json[index]), function (num, key) {

        var newCate = `
          <div class="categoryBlock">
            <div class="categoryTitle">
              <h3>${key}</h3>
            </div>
            <hr>
            <span class="categories${num}">
              <!-- <a href="">保湿补水</a> -->
            </span>
          </div>
          `
        $(`.category${index+1} .double`).append(newCate);
        var newli = ' ';
        $.each(json[index][key], function (i, a) {
          newli += `<a>${a}</a>`;
        })
        $(`.category${index+1} .categories${num}`).append(newli);
        // console.log(newli);
        // console.log();
      })
    })
    // console.log(json[0]);
  }
})
//导入类别栏

// 导入打折商品
$.ajax({
  url: '../data/discount.json',
  type: "get",
  data: " ",
  dataType: "json",
  success: function (json) {
    $.each(json, function (index, val) {
      var discountDiv = '';
      discountDiv = `
      <div class="discount${index}">
        <img class="discountPic" src="${val.imgUrl}">
        <div class="discountMeta">
          <span class="discountTxt">海外品牌</span>
          <span class="discountTitle">${val.title}</span>
          <div class="discountTitle-des">${val.des}</div>
        </div>
        <div class="priceLeft float-l">
          <div class="price">
            <span class="act">
              <span class="rmb">¥</span>
              <span class="big">${val.priceNow}</span>
            </span>
            <span class="tag gray"><span class="rmb">¥</span class="priceEver">${val.priceEver}</span>
          </div>
          <span class="sold">已售<span class="soldNum">${val.soldNum}</span>件</span>
        </div>
        <a class="buyNow float-r">马上抢</a>
      </div>
      `
      $('.discount').append(discountDiv);
    });
  }
})
// 导入打折商品



$('.item').hover(function () {
  $(this).find('img').css('transform', 'translate(-5px)')
}, function () {
  $(this).find('img').css('transform', 'translate(5px)')
})





console.log(111);
$.ajax({
  url: '../data/beauty.json',
  type: 'post',
  data: "",
  dataType: 'json',
  success: function (data) {
    console.log(data);
    var newDiv = `
      <div class="beauty">
        <div class="moduleList float-l">
          <span>${data.listTitle}</span>
          <ul></ul>
        </div>
        <a class="modulePic float-l" href="">
          <img src="${data.modulePic}" alt="">
          <div>
            <h3>${data.modulePicTitle}</h3>
            <p>查看更多&gt;</p>
          </div>
        </a>
        <div class="shopwindow float-l">
          <div class="row first">
            <a class="item big first" href="">
              <div class="itemleft float-l">
                <div class="itemleft-title">${data.block1['title']}</div>
                <div class="price">
                  <span class="item-act-price"><span class="rmb">¥</span>${data.block1['price']}</span>
                  <span class="item-tag-price"><span class="rmb">¥</span>${data.block1['before']}</span>
                </div>
              </div>
              <img src="${data.block1['pic']}" class="item-img">
            </a>
            <a class="item">
              <img src="${data.block2['pic']}" class="item-img">
              <div class="item-title">${data.block2['title']}</div>
              <div class="price">
                <span class="item-act-price"><span class="rmb">¥</span>${data.block2['price']}</span>
                <span class="item-tag-price"><span class="rmb">¥</span>${data.block2['before']}</span>
              </div>
            </a>
          </div>
          <div class="row">

            <a class="item">
              <img src="${data.block3['pic']}" class="item-img">
              <div class="item-title">${data.block3['title']}</div>
              <div class="price">
                <span class="item-act-price"><span class="rmb">¥</span>${data.block3['price']}</span>
                <span class="item-tag-price"><span class="rmb">¥</span>${data.block3['before']}</span>
              </div>
            </a>
    
            <a class="item" href="">
              <img src="${data.block4['pic']}" class="item-img">
              <div class="item-title">${data.block4['title']}</div>
              <div class="price">
                <span class="item-act-price"><span class="rmb">¥</span>${data.block4['price']}</span>
                <span class="item-tag-price"><span class="rmb">¥</span>${data.block4['before']}</span>
              </div>
            </a>
    
            <a class="item" href="">
              <img src="${data.block5['pic']}" class="item-img">
              <div class="item-title">${data.block5['title']}</div>
              <div class="price">
                <span class="item-act-price"><span class="rmb">¥</span>${data.block5['price']}</span>
                <span class="item-tag-price"><span class="rmb">¥</span>${data.block5['before']}</span>
              </div>
            </a>
            
          </div>
        </div>
    
    
    
        <div class="moduleSwiperWrap float-l">
          <div class="title">
            <span class="strong">BRAND</span>
            ${data.sliderTitle}
          </div>
    
          <div class="swiper-container moduleSwiper">
            <div class="swiper-wrapper">
              <div class="swiper-slide">
                <div>
                  <img src="${data.slider1[0][1]}" alt="">
                  <span>${data.slider1[0][0]}</span>
                </div>
                <div>
                  <img src="${data.slider1[1][1]}" alt="">
                  <span>${data.slider1[1][0]}</span>
                </div>
                <div>
                  <img src="${data.slider1[2][1]}" alt="">
                  <span>${data.slider1[2][0]}</span>
                </div>
                <div>
                  <img src="${data.slider1[3][1]}" alt="">
                  <span>${data.slider1[3][0]}</span>
                </div>
                <div>
                  <img src="${data.slider1[4][1]}" alt="">
                  <span>${data.slider1[4][0]}</span>
                </div>
                <div>
                  <img src="${data.slider1[5][1]}" alt="">
                  <span>${data.slider1[5][0]}</span>
                </div>
                <div>
                  <img src="${data.slider1[6][1]}" alt="">
                  <span>${data.slider1[6][0]}</span>
                </div>
                <div>
                  <img src="${data.slider1[7][1]}" alt="">
                  <span>${data.slider1[7][0]}</span>
                </div>
              </div>
              <div class="swiper-slide">
                <div>
                  <img src="${data.slider2[0][1]}" alt="">
                  <span>${data.slider2[0][0]}</span>
                </div>
                <div>
                  <img src="${data.slider2[1][1]}" alt="">
                  <span>${data.slider2[1][0]}</span>
                </div>
                <div>
                  <img src="${data.slider2[2][1]}" alt="">
                  <span>${data.slider2[2][0]}</span>
                </div>
                <div>
                  <img src="${data.slider2[3][1]}" alt="">
                  <span>${data.slider2[3][0]}</span>
                </div>
                <div>
                  <img src="${data.slider2[4][1]}" alt="">
                  <span>${data.slider2[4][0]}</span>
                </div>
                <div>
                  <img src="${data.slider2[5][1]}" alt="">
                  <span>${data.slider2[5][0]}</span>
                </div>
                <div>
                  <img src="${data.slider2[6][1]}" alt="">
                  <span>${data.slider2[6][0]}</span>
                </div>
                <div>
                  <img src="${data.slider2[7][1]}" alt="">
                  <span>${data.slider2[7][0]}</span>
                </div>
              </div>
              <div class="swiper-slide">
                <div>
                  <img src="${data.slider3[0][1]}" alt="">
                  <span>${data.slider3[0][0]}</span>
                </div>
                <div>
                  <img src="${data.slider3[1][1]}" alt="">
                  <span>${data.slider3[1][0]}</span>
                </div>
                <div>
                  <img src="${data.slider3[2][1]}" alt="">
                  <span>${data.slider3[2][0]}</span>
                </div>
                <div>
                  <img src="${data.slider3[3][1]}" alt="">
                  <span>${data.slider3[3][0]}</span>
                </div>
                <div>
                  <img src="${data.slider3[4][1]}" alt="">
                  <span>${data.slider3[4][0]}</span>
                </div>
                <div>
                  <img src="${data.slider3[5][1]}" alt="">
                  <span>${data.slider3[5][0]}</span>
                </div>
                <div>
                  <img src="${data.slider3[6][1]}" alt="">
                  <span>${data.slider3[6][0]}</span>
                </div>
                <div>
                  <img src="${data.slider3[7][1]}" alt="">
                  <span>${data.slider3[7][0]}</span>
                </div>
              </div>
              
            </div>
            <div class="swiper-pagination"></div>
          </div>
        </div>
      </div>
    `
    $('.beautyWrap1').html(newDiv)
    var lis = '';
    $(data.list).each(function (index, el) {
      lis += `<li>${el}</li>`;
    })
    console.log(lis);
    $('.moduleList ul').html(lis);

    var newBlock = '';
    for (var i = 3; i <6; i++){

    }


    var myModuleSwiper = new Swiper('.moduleSwiper', {
      direction: 'horizontal', 
      loop: true,
      autoplay: {
        delay: 3000, 
      },
      
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      }
    })
  }
})

