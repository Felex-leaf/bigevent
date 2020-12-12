$(() => {
  $.ajax({
    url: '/my/userinfo',
    success(res) {
      let data = res.data;
      console.log(data);
      if (!data.user_pic) {
        let str = data.username.slice(0, 1).toUpperCase();
        $('.avatar').text(str);
      } else if (data.user_pic) {
        $('.avatarImg')[0].src = data.user_pic;
      }
      if (!data.nickname) {
        $('.username').html('欢迎&nbsp;&nbsp;' + data.username);
      }
    },
  });
});
