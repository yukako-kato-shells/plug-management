
export function convertDateFormat(dateString: string): string {
  const daysOfWeek = ['日', '月', '火', '水', '木', '金', '土'];
  const date = new Date(dateString.replace(/-/g, '/'));

  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  const dayOfWeek = daysOfWeek[date.getDay()];
  const hours = ('0' + date.getHours()).slice(-2);
  const minutes = ('0' + date.getMinutes()).slice(-2);

  return `${year}/${month}/${day} (${dayOfWeek}) ${hours}:${minutes}`;
}

// メールアドレスのバリデーション
export const validateEmail = (email: string) => {
  var regex = new RegExp(/^[A-Za-z0-9]{1}[A-Za-z0-9_.+-]*@{1}[A-Za-z0-9_.-]+.[A-Za-z0-9]+$/);
  return regex.test(email) ? true : false;
}