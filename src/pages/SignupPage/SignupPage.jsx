import React from 'react';
import './SignupPage.css';
import axiosInstance from "../../api/axiosInstance";

const SignupPage = () => {
    const backendUrl = axiosInstance.defaults.baseURL;

    return (<div className="container">
            <main className="main">
                <div className="signup-form">
                    <h2>소셜 계정으로 회원가입</h2>
                    <p>간편하게 소셜 계정으로 가입하세요.</p>
                    <div className="social-btn-container">
                        <a href={`${backendUrl}/oauth2/authorization/naver`} className="social-btn naver-btn">네이버로 회원가입</a>
                        <a href={`${backendUrl}/oauth2/authorization/kakao`} className="social-btn kakao-btn">카카오로 회원가입</a>
                        <a href={`${backendUrl}/oauth2/authorization/google`} className="social-btn google-btn">구글로 회원가입</a>
                    </div>
                    <p className="login-link">이미 계정이 있으신가요? <a href="/login">로그인</a></p>
                </div>
            </main>
            <footer className="footer">
                <p>&copy; 2024 11조 프로젝트. All rights reserved.</p>
            </footer>
        </div>);
}

export default SignupPage;
