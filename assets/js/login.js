$(() => {
  //登录注册窗口的切换
  $('#goToResgiter').click(() => {
    $('.login').hide();
    $('.resgiter').show();
  });
  $('#goToLogin').click(() => {
    $('.login').show();
    $('.resgiter').hide();
  });

  //密码验证
  let form = layui.form;
  form.verify({
    pass: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    repass(value) {
      if (value !== $('.password').val()) {
        return '两次输入的密码需要保持一致';
      }
    },
  });

  //根目录优化
  $.ajaxPrefilter((options) => {
    options.url = 'http://ajax.frontend.itheima.net' + options.url;
  });

  //resgiter form提交事件
  $('#resgiterForm').submit(function (e) {
    e.preventDefault();
    let data = $(this).serialize();
    $.ajax({
      type: 'POST',
      url: '/api/reguser',
      data,
      success(res) {
        if (res.status !== 0) {
          layer.msg(res.message, { icon: 2 });
          return;
        }
        layer.msg('注册成功', { icon: 1 });
        $('#resgiterForm')[0].reset();
        $('#goToLogin').click();
      },
    });
  });
  $('#loginForm').submit(function (e) {
    e.preventDefault();
    let data = $(this).serialize();
    $.ajax({
      type: 'POST',
      url: '/api/login',
      data,
      success(res) {
        if (res.status !== 0) {
          layer.msg(res.message, { icon: 2 });
          return;
        }
        $('#loginForm')[0].reset();
        localStorage.setItem('token', res.token);
        layer.msg('登录成功', { icon: 1, time: 1000 }, function () {
          location.href = '/home/index.html';
        });
      },
    });
  });
});
