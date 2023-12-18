function getResult() {
    const userId = parseInt(document.getElementById('userId').value, 10);
    const loginDays = parseInt(document.getElementById('loginDays').value, 10);

    const accountCreationDate = new Date(1600218000000 + userId / 1024 / 4096);
    document.getElementById('creationDate').textContent = 'アカウント作成日：' + accountCreationDate.toLocaleDateString();

    const currentDate = new Date();
    const elapsedDays = Math.floor((currentDate - accountCreationDate) / (1000 * 60 * 60 * 24));
    document.getElementById('elapsedDays').textContent = 'アカウント作成日からの経過日数：' + elapsedDays + ' 日';

    const missedDays = Math.max(0, elapsedDays - loginDays);
    document.getElementById('missedDays').textContent = '未ログイン日数：' + missedDays + ' 日';
}
