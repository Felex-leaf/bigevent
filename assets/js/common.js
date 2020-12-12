if (!localStorage.getItem('token') && !location.href.includes('/login'))
  location.href = '/home/login.html';
$(() => {
  $.ajaxPrefilter((options) => {
    options.url = 'http://ajax.frontend.itheima.net' + options.url;

    if (options.url.includes('/my')) {
      options.headers = {
        Authorization: localStorage.getItem('token'),
      };
      options.complete = function (xhr) {
        if (
          xhr.responseJSON.status !== 0 &&
          xhr.responseJSON.message !== '获取用户基本信息成功！'
        ) {
          location.href = '/home/login.html';
        }
      };
    }
  });
});
