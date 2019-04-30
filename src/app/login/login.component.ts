import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { LoginIdService } from 'src/app/login-id.service'
declare let Kakao: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private auth:AuthService,
    private kakaoId:LoginIdService
  ) { 
    this.kakaoId.kakaoId
  }

  ngOnInit() {
          //<![CDATA[
    // 사용할 앱의 JavaScript 키를 설정해 주세요.
    Kakao.init('9ee6f21f20ec159d25cec2935e2fa4b2');
    // 카카오 로그인 버튼을 생성합니다.
    Kakao.Auth.createLoginButton({
      container: '#kakao-login-btn',
      success: (authObj) => {
        // 로그인 성공시, API를 호출합니다.
        Kakao.API.request({
          url: '/v2/user/me',
          success: (res) => {
            this.kakaoId.kakaoId.push(res);
            console.log(res)
          },
          fail: (error) => {
            alert(JSON.stringify(error));
          }
        });
        Kakao.Auth.setAccessToken(authObj.access_token);
        this.auth.authorized(authObj.access_token);
      },
      fail: function(err) {
        alert(JSON.stringify(err));
      }
    });
  //]]>
  }

}
