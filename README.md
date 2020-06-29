URL	/muzics		
메소드	GET		
쿼리 스트링			
			
URL 예	/muzics			
			
	응답		
컨텐트 타입	JSON		
메세지 구조		title	음악 제목
		        id	음악 ID
		        sinnger	가수
		        year	년도
			
업무	음악 상세 정보 제공		
URL	/muzics/ID		ID : 영화 ID
메소드	GET		
쿼리 스트링	없음		
바디 인코딩	없음		
			
	응답		
컨텐트 타입	JSON		
메세지 구조	msg		성공/실패 메세지
	data		상세 정보
	id	음악 ID
	title	음악 제목
	sinnger	가수
	year	발매일

업무	음악 정보 추가		
URL	/muzics		
요청 메소드	POST		
쿼리 스트링	없음		
콘텐트 타입	application/json		
메세지 구조	title	필수	
	singger		
	year	숫자	
			
요청 메시지 예	"{
    “title”:”초”,
    “sinnger”:”한동근”,
    “year”:2015}"		

업무	음악 정보 수정		
URL	/muzics/id		
요청 메소드	PUT		
쿼리 스트링	없음		
콘텐트 타입	application/json		
메세지 구조	title		
	singger		
	year	숫자	
			
요청 메시지 예	"{
    “title”:”초”,
    “sinnger”:”한동근”,
    “year”:2015}"		
			
업무	음악 정보 수정		
URL	/muzics/id		
요청 메소드	DELETE		
쿼리 스트링	없음		
콘텐트 타입	application/json		
메세지 구조			
			
	응답		
컨텐트 타입	JSON		
메세지 구조	msg		성공/실패 메세지
	data		
		id	ID로 데이터 삭제


테스트유저 = 202012708, yhg
비밀번호 = 1234, 1234
			
			

