var switchLogin = function (){
    $('.loginArea').addClass('show');
    $('.registerArea').removeClass('show');
    $('.loginBoxTitle').addClass('active');
    $('.registerBoxTitle').removeClass('active');
    $('.loginId').val($('.registerId').val());
}
var switchRegister = function (){
    $('.registerArea').addClass('show');
    $('.loginArea').removeClass('show');
    $('.registerBoxTitle').addClass('active');
    $('.loginBoxTitle').removeClass('active');
}
$('.loginBoxTitle').on('click',switchLogin);
$('.registerBoxTitle').on('click',switchRegister);




$('.register').on('click',function(){
    if (!$('.registerId').val() || !$('.registerPass').val()) {
        alert('账号或密码不能为空');
        return false;
    } else if( !$('.confirmPass').val()){
        alert('请再次确认密码')
        return false;
    } else if ($('.registerPass').val() !== $('.confirmPass').val()){
        alert('两次输入的密码不一致，请重新确认密码');
        $('.registerPass, .confirmPass').one('click',function(){
            $('.registerPass, .confirmPass').val('');
        })
        return false;
    }
    $.ajax({
        url: '../data/user.php',
        type: 'post',
        data:{
            type: 'register',
            user: $('.registerId').val(),
            pass: $('.registerPass').val()
        },
        dataType: 'json',
        success: function (data){
            alert(data.msg);
            if (data.err === 3) {
                switchLogin($('.registerId').val());
            }
            $('.registerId').val('');
            $('.registerPass').val('');
            $('.confirmPass').val('');
        },
        error: function (status){
            alert('提交失败');
        }
    })
})


$('.login').on('click',function(){
    if (!$('.loginId').val() || !$('.loginPass').val()) {
        alert('账号或密码不能为空');
        return false;
    }
    $.ajax({
        url: '../data/user.php',
        type: 'post',
        data:{
            type: 'login',
            user: $('.loginId').val(),
            pass: $('.loginPass').val()
        },
        dataType: 'json',
        success: function (data){
            alert(data.msg);
            if (data.err === 1){

                localStorage.setItem('user',$('.loginId').val());


                $(location).attr('href', './index.html');


            }else if(data.err === -1){
                $('.loginId, .loginPass').one('click',function(){
                    $('.loginId, .loginPass').val('');
                })
            }
        },
        error: function (status){
            alert('提交失败');
        }
    })
})