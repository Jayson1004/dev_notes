import { serverHost } from './share.js';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('resetForm');
    const message = document.getElementById('message');

    if (!form) {
        console.error('Form not found');
        return;
    }

    // 获取 reset token
    const resetToken = window.location.pathname.split('/reset/')[1];
    console.log('Reset Token:', resetToken); // 用于调试

    // 生成 X-Trace-ID 函数
    const generateXTraceId = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log('Form submitted');

        const newPassword = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        console.log('New Password:', newPassword);
        console.log('Confirm Password:', confirmPassword);

        if (newPassword !== confirmPassword) {
            message.innerHTML = '<div class="alert alert-danger">Passwords do not match.</div>';
            return;
        }

        const xTraceId = generateXTraceId();

        // Send reset password request to server
        fetch(`${serverHost}/resetPwd`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Trace-ID': xTraceId
            },
            body: JSON.stringify({ 
                token: resetToken,
                new_password: newPassword 
            }),
        })
        .then(response => {
            console.log('Response received');
            return response.json();
        })
        .then(data => {
            if (data.detail && data.detail.success === false) {
                if (data.detail.error_code === "1009") {
                    // Token 过期
                    message.innerHTML = `
                        <div class="alert alert-warning">
                            Your password reset token has expired. Please request a new password reset email.
                        </div>`;
                } else {
                    // 其他错误
                    message.innerHTML = `<div class="alert alert-danger">Error: ${data.detail.error_message}</div>`;
                }
            } else if (data.success) {
                message.innerHTML = '<div class="alert alert-success">Password reset successfully. Redirecting to home page...</div>';
                // 3秒后跳转到主页
                setTimeout(() => {
                    window.location.href = '/index.html';  // 假设主页的URL是 /index.html
                }, 3000);
            } else {
                message.innerHTML = '<div class="alert alert-danger">Failed to reset password. Please try again.</div>';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            message.innerHTML = '<div class="alert alert-danger">An error occurred. Please try again later.</div>';
        });
    });
});