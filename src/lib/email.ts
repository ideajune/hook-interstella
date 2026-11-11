import nodemailer from "nodemailer";

export async function sendWelcomeEmail(toEmail: string, displayName: string): Promise<boolean> {
  try {
    const smtpHost = process.env.SMTP_HOST || "localhost";
    const smtpPort = parseInt(process.env.SMTP_PORT || "25", 10);
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const fromAddress = process.env.SMTP_FROM || "no-reply@hookinterstellar.com";

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: smtpUser && smtpPass ? { user: smtpUser, pass: smtpPass } : undefined,
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailHtml = `
      <div style="max-width: 600px; margin: 0 auto; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #17212B; line-height: 1.6; border: 1px solid #E5EAF0; border-radius: 12px; overflow: hidden;">
        <div style="background-color: #07182D; padding: 32px 24px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 22px; letter-spacing: 1px;">HOOK INTERSTELLAR</h1>
          <p style="color: #2998D6; margin: 6px 0 0 0; font-size: 12px; letter-spacing: 2px; font-weight: 600;">BEYOND THE HORIZON</p>
        </div>
        <div style="padding: 32px 24px;">
          <h2 style="font-size: 18px; margin-top: 0; color: #07182D;">${displayName}님, 회원가입을 환영합니다!</h2>
          <p style="font-size: 14px; color: #5D6B78;">
            후크인터스텔라(주)의 공식 플랫폼 회원이 되신 것을 진심으로 환영합니다.
          </p>
          <div style="background-color: #F8FAFC; border: 1px solid #E5EAF0; border-radius: 8px; padding: 16px; margin: 20px 0; font-size: 13px;">
            <p style="margin: 4px 0;"><strong>가입 이메일(아이디):</strong> ${toEmail}</p>
            <p style="margin: 4px 0;"><strong>회원 닉네임:</strong> ${displayName}</p>
            <p style="margin: 4px 0;"><strong>가입 일시:</strong> ${new Date().toLocaleString("ko-KR", { timeZone: "Asia/Seoul" })}</p>
          </div>
          <p style="font-size: 14px; color: #5D6B78;">
            이제 <strong>SPACE IDEAS</strong>에서 우주 기술, 생존 솔루션, 우주 주거와 교육에 관한 아이디어를 자유롭게 제안하고 다른 연구자 및 시민들과 토론하실 수 있습니다.
          </p>
          <div style="margin-top: 30px; text-align: center;">
            <a href="https://hookinterstellar.com/space-ideas" style="display: inline-block; background-color: #147FC5; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 14px; padding: 12px 24px; border-radius: 8px;">
              우주 아이디어 광장 바로가기
            </a>
          </div>
        </div>
        <div style="background-color: #F8FAFC; border-top: 1px solid #E5EAF0; padding: 20px 24px; font-size: 12px; color: #8C9BA8; text-align: center;">
          <p style="margin: 0;">후크인터스텔라(주) · 대표자: 최규철 · 사업자등록번호: 186-87-03898</p>
          <p style="margin: 4px 0 0 0;">서울특별시 강남구 삼성로103길 6 · 010-7710-3801</p>
          <p style="margin: 8px 0 0 0; color: #B0BEC5;">본 메일은 발신 전용이며 회신되지 않습니다.</p>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"HOOK INTERSTELLAR" <${fromAddress}>`,
      to: toEmail,
      subject: `[HOOK INTERSTELLAR] ${displayName}님, 회원가입이 완료되었습니다.`,
      text: `${displayName}님, 후크인터스텔라(주) 회원가입이 완료되었습니다. 가입 이메일: ${toEmail}`,
      html: mailHtml,
    });

    return true;
  } catch (err) {
    console.error("Failed to send welcome email:", err);
    return false;
  }
}
