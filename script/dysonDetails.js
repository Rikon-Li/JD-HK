function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return (r[2]);
    return null;
}
var sname = GetQueryString("name");
if (sname != null) {
    var sname_ = decodeURIComponent(sname);
    alert(sname_);
}
var index = GetQueryString('index');
console.log(GetQueryString('index'));

$.ajax({
    url: '../data/dysonDetails.json',
    type: 'post',
    data: " ",
    dataType: 'json',
    success: function (data) {
        console.log(data[index]);
        $('.sPicWrap img').attr('src',data[index].pic);
        
        $(data[index].selectPics).each(function (index,pic) {  
            $('.picSlcWrap').append(`<img
            src="${pic}" class="picSlc">`);
        })
        $('.goodsTitle').html(`<span>${data[index].title}</span>`);
        
        $('.priceLine b').text(data[index].price);

        $(data[index].smallPics).each(function (index,pic) {  
            console.log(pic);
            console.log($('.classify').get(0));
            $('.classify').append(`<img
            src="${pic}"
            alt="">`);
        })

        
    }
});





(function () {
    function Magnify(options) {
        this.init(options);
    }
    Magnify.prototype = {
        contructor: Magnify,
        init: function (options) {
            this.mask = this.getNodes(options.mask);
            this.left = this.getNodes(options.left);
            this.maxBox = this.getNodes(options.maxBox);
            this.maxImg = this.getNodes(options.maxImg);
            this.bindEvent();
        },
        getNodes: function (selector) {
            return document.querySelector(selector);
        },
        bindEvent: function () {
            this.left.onmouseenter = function () {
                this.mouseIn();
            }.bind(this)
            this.mask.onmouseleave = function () {
                this.mouseLeave();
            }.bind(this)
            this.left.onmousemove = function (ev) {
                this.mouseMove(ev);
            }.bind(this)
        },
        mouseIn: function () {
            this.showHide(this.mask, 'block');
            this.showHide(this.maxBox, 'block');
        },
        mouseLeave: function () {
            this.showHide(this.mask, 'none');
            this.showHide(this.maxBox, 'none');
        },

        showHide: function (dom, attr) {
            dom.style.display = attr;
        },
        mouseMove: function (ev) {
            this.calcMaskLoc(ev);
            this.mask.style.left = this.maskX + 'px';
            this.mask.style.top = this.maskY + 'px';
            this.calcMagnify();
            this.maxImg.style.left = -this.maxImgX + 'px';
            this.maxImg.style.top = -this.maxImgY + 'px';
        },
        calcMaskLoc: function (ev) {
            this.maskX = ev.clientX - this.offset(this.left, false).left - this.mask.clientWidth / 2;
            this.maskY = ev.clientY - this.offset(this.left, false).top - this.mask.clientHeight / 2 + document.documentElement.scrollTop;
            this.judgeMask();
        },
        judgeMask: function () {
            this.maskX = this.maskX < 0 ? 0 : this.maskX;
            this.maskX = this.maskX > (this.left.clientWidth - this.mask.clientWidth) ? this.left.clientWidth - this
                .mask.clientWidth : this.maskX;
            this.maskY = this.maskY < 0 ? 0 : this.maskY;
            this.maskY = this.maskY > (this.left.clientHeight - this.mask.clientHeight) ? this.left.clientHeight -
                this.mask.clientHeight : this.maskY;
        },
        calcMagnify: function () {
            this.scaleX = this.maskX / (this.left.clientWidth - this.mask.clientWidth);
            this.scaleY = this.maskY / (this.left.clientHeight - this.mask.clientHeight);
            this.maxImgX = this.scaleX * (this.maxImg.clientWidth - this.maxBox.clientWidth);
            this.maxImgY = this.scaleY * (this.maxImg.clientHeight - this.maxBox.clientHeight);
        },
        offset: function (dom, bool) {
            var l = 0,
                t = 0;
            var bdleft = dom.clientLeft;
            var bdtop = dom.clientTop;
            while (dom) {
                l = l + dom.offsetLeft + dom.clientLeft;
                t = t + dom.offsetTop + dom.clientTop;
                dom = dom.offsetParent;
            }
            if (bool) {
                return {
                    left: l - bdleft,
                    top: t - bdtop
                };
            } else {
                return {
                    left: l,
                    top: t
                };
            }
        },
    }

    function factory(options) {
        return new Magnify(options);
    }
    window.magnify = factory;
})();

magnify({
    mask: '.mask',
    left: '.sPicWrap',
    maxBox: '.maxBox',
    maxImg: '.maxBox img'
});


var timer;
var imgIndex = 0;
var imgHeight = 174;

function autoMove() {
    timer = setInterval(function () {
        moveNext();
    }, 3000);
}

autoMove();

function moveNext() {
    imgIndex += 3;
    if (imgIndex >= $('.wrapCon').children().length) {
        imgIndex = 3;
        $('.wrap').get(0).scrollTop = 0;
    }
    animate($('.wrap').get(0), {
        'scrollTop': imgIndex * imgHeight
    });
}

function movePrev() {
    imgIndex -= 3;
    if (imgIndex < 0) {
        imgIndex = $('.wrapCon').children().length - 6;
        $('.wrap').get(0).scrollTop = ($('.wrapCon').children().length - 3) * imgHeight;
    }
    animate($('.wrap').get(0), {
        'scrollTop': imgIndex * imgHeight
    });
}

$('.icon-down1').on("click", () => {
    console.log(111);
    moveNext();
})

$('.icon-up1').on("click", () => {
    console.log(111);
    movePrev();
})

$('.picSlcWrap').on('click','img', function () {
    // console.log($(this).attr('src'));
    $('.sPicWrap img').attr('src', $(this).attr('src'));
    $('.maxBox img').attr('src', $(this).attr('src'));
})

$('.quantityAdd').on('click',function(){
    $('.quantity input').attr('value',Number($('.quantity input').attr('value'))+1)
})
$('.quantitySub').on('click',function(){
    if($('.quantity input').attr('value')>1){
        $('.quantity input').attr('value',Number($('.quantity input').attr('value'))-1)
    }
})