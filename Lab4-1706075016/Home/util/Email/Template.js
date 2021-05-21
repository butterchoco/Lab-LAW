const EmailTemplate = `
<html lang="en">
<head>
<style>
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: sans-serif;
    }
    .container {
        margin: auto;
        max-width: 70%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.06);
        border: 1px solid rgba(0, 0, 0, 0.06);
    }
    .header {
        background: linear-gradient(45deg, #a18ff3, #4078df);
        width: 100%;
        text-align: center;
        padding: 4rem;
        color: white;
    }
    .content {
        padding: 4rem;
    }
</style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Hi, Qwertizen!</h1>
        </div>
        <div class="content">
            <p>Terima kasih sudah menghubungi kami. Silahkan tunggu 7 hari kerja untuk melakukan aktivasi akun.</p>
            <br/>
            <hr/>
            <p>Pesan ini disampaikan oleh <a href="https://www.instagram.com/qwertyvisual/">Qwerty Visual</a>.</p>
        </div>
    </div>
</body>
</html>
`;

module.exports = EmailTemplate;
