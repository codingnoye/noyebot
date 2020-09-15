Noyebot
=======
적당히 쓸만한 디코 봇

패키지로 구분해 쉽게 명령어 등을 추가할 수 있는 봇 베이스 프로젝트

# 시작하기
준비물: `node`, `npm`
* `git clone https://github.com/codingnoye/noyebot`으로 봇을 가져온다.
* `cd noyebot`으로 디렉토리에 들어간다.
* `npm install`로 node 의존성을 설치한다. 
* [Discord developers portal](https://discord.com/developers/applications/)로 가서 봇을 만들고 토큰을 가져와 `.env`의 TOKEN에 넣는다.
* `npm start`로 봇을 실행한다. 
* OAuth로 초대링크를 발급받아 봇을 디스코드 서버에 초대할 수 있다.

# 폴더 구조 (src아래만 설명)
* `data/` : 데이터 저장 영역, `libs/data.js`에서 관리한다.
* `.env` : 전역 설정 파일
* `pkgs/` : 패키지 영역. `pkgs/template`를 복사해 패키지를 만들면 된다.
* `libs/` : 라이브러리들
* `index.js` : 엔트리 포인트

# 기본 명령어
`!help`를 이용해 확인해 보자. `!pkg`라는 명령어를 통해 패키지를 활성화/비활성화 할 수 있다.

# 패키지 추가하기
`main.js`에서 `pkg_modules`에 원하는 패키지를 넣으면 된다. 여기서 패키지는 `libs/Package`객체이기만 하면 되고, 일반적으로 `pkgs`아래의 폴더 내의 모듈을 만들어 `require`해서 사용한다. 추가된 패키지를 서버에 적용하려면 해당 서버에서 `!pkg enable <pkgName>`을 통해 활성화하면 된다.

간단한 예시가 필요하면 `pkgs/conch`에서 간단한 '마법의 소라고동' 예시를, 좀 더 자세한 예시가 필요하면 `pkgs/core`에서 기본 명령어 예시를 보자.

# 동작 구조
`main.js`가 엔트리 포인트이다. `discord.js`의 `client`로부터 `message`이벤트를 `libs/Bot`객체들로 전달한다. 여기서 `libs/Bot`객체는 각 서버별로 생성되며 서버별로 패키지와 설정들을 다룬다.


`libs/Bot`은 메시지를 전달받았을 때, 로드된 패키지들에게 메시지를 전달해 준다. 또한 명령어로 인식되는 메시지의 경우 추가적으로 패키지들의 `libs/Router`를 call한다.


`libs/Router`는 `routes`와 `operate`를 가지는데, `routes`는 하위 라우터들, `operate`는 적절한 하위 라우터를 찾지 못했을 때 메시지를 처리할 함수다. `operate`가 `true`를 반환하면 정상적으로 메시지가 처리된 것으로 취급한다.
* `hello: Router`
    * `hello.routes: Object`
        * `world: Router`
            * `world.operate: Function` "Hello, world!"를 출력한다.
            * `world.router: Object` 빈 객체
    * `hello.operate: Function`: "Hi, ${command}"을 출력한다. command는 처리되지 못한 명령어 부분들이다.
위와 같은 형태가 있다면
1. `!hello`라는 메시지가 bot에게 전달됨.
2. 파싱되어 `["hello"]`로 변환됨
3. bot에게 로드된 패키지의 라우터 중 `"hello"`와 일치하는 것을 찾음
4. `hello.call([])`가 호출됨 (hello라는 라우터에게 나머지 메시지를 전달함)
5. `hello.routes` 중 `"world"`와 일치하는 것을 찾음
6. `hello.routes.world.call()`가 호출됨. 
7. `world`에게는 하위 라우터가 없으므로 `operate`가 실행된다.
8. "Hello, world!"가 출력된다.


또 다른 예시
1. `!hello noye`라는 메시지가 bot에게 전달됨.
2. 파싱되어 `["hello", "noye"]`로 변환됨
3. bot에게 로드된 패키지의 라우터 중 `"hello"`와 일치하는 것을 찾음
4. `hello.call(["noye"])`가 호출됨 (hello라는 라우터에게 나머지 메시지를 전달함)
5. `hello.routes` 중 `"noye"`와 일치하는 것이 없으므로 `operate`가 실행된다.
8. "Hi, noye!"가 출력된다.
이 예시는 template패키지에 적용되어 있으므로, 필요하다면 `main.js`의 `pkg_modules`에서 로드하고 `!pkg enable 템플릿`으로 활성화해 테스트해보자.
# 기타
* 디스코드 `코딩노예 #1483`
* PR 환영