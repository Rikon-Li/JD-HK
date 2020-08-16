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



$('.item').hover(function() {
  $(this).find('img').css('transform','translate(-5px)')
},function() {
  $(this).find('img').css('transform','translate(5px)')
})



var mySwiper = new Swiper('.moduleSwiper', {
  direction: 'horizontal', // 垂直切换选项
  loop: true,
  autoplay: {
    delay: 3000,//1秒切换一次
  },
  // 如果需要分页器
  pagination :{
    el: '.swiper-pagination',
    clickable :true,
    

  }

})