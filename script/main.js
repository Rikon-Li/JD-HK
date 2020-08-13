var mySwiper = new Swiper('.swiper-container', {
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

$('.swiper-container').hover(() => {
  $('.swiper-button-prev').stop().animate({
    left: '0px',
    opacity: '0.7',
  }, "fast");
  $('.swiper-button-next').stop().animate({
    right: '0px',
    opacity: '0.7',
  }, "fast");
}, () => {
  $('.swiper-button-prev').stop().animate({
    left: '-34px',
    opacity: '0.2',
  }, "fast");
  $('.swiper-button-next').stop().animate({
    right: '-34px',
    opacity: '0.2',
  }, "fast");
})


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
        console.log(newli);
        // console.log();
      })
    })
    // console.log(json[0]);
  }
})