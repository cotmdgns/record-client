/* 드롭  */
drop table address;
drop table used_product;
drop table product;
drop table comment;
drop table user_order;
drop table used_comment;
drop table shopping_save;
drop table user_table;

select * from address;
select * from used_product;
select * from product;
select * from comment;
select * from user_order;
select * from used_comment;
select * from shopping_save;
select * from user_table;

/* 컬럼  */
CREATE TABLE user_table ( /* 유저 테이블 */
    user_code INT PRIMARY KEY AUTO_INCREMENT,  -- 유저코드
    user_id VARCHAR(50) unique,                 -- 아이디
    user_pwd VARCHAR(50),                		-- 패스워드
    user_name VARCHAR(50),               		-- 이름
    user_gender VARCHAR(1),                     -- 성별
	user_phone VARCHAR(50),                     -- 전화번호
    user_birthdaydata VARCHAR(50),              -- 생년월일
    user_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- 생성날짜
    user_address VARCHAR(50) default null,      -- 주소
    user_email VARCHAR(50) default null,    	-- 이메일
    user_img BLOB default null                  -- 유저 이미지
);


/*
CREATE TABLE coupon (
	user_code INT,                          -- 유저코드 (integer로 지정)
    coupon_name VARCHAR(255),              -- 쿠폰이름
    coupon_date VARCHAR(50),               -- 날짜
    coupon_percent VARCHAR(50)            -- 쿠폰할인
);
*/

CREATE TABLE product ( /* 제품 */
    product_code INT PRIMARY KEY AUTO_INCREMENT,       -- 플레이어상품코드
    product_type VARCHAR(50) default null,      -- 타이틀 (LP냐 레코드냐)
    product_name VARCHAR(255) UNIQUE,           -- 플레이어상품이름 (유니크)
    product_price VARCHAR(50),                  -- 플레이어상품가격
    product_img text, 							-- 플레이어 이미지
    product_explanation VARCHAR(255),           -- 플레이어정보
    product_quantity INT DEFAULT -1             -- 플레이어수량 (기본값 -1)
);

CREATE TABLE Used_product ( /*중고상품*/
    Used_product_code INT PRIMARY KEY AUTO_INCREMENT,            -- 중고상품코드
    Used_product_name VARCHAR(255),               -- 중고상품이름
    Used_product_user_name VARCHAR(255),          -- 중고상품유저이름
    Used_product_price VARCHAR(50),                -- 중고상품가격
    Used_product_img text, 						  -- 중고이미지
    Used_product_explanation VARCHAR(255)         -- 중고상품정보
);

CREATE TABLE comment ( /*댓글상품*/
    comment_code INT PRIMARY KEY AUTO_INCREMENT,       -- 댓글번호
    comment_text VARCHAR(255),                   -- 텍스트
    comment_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- 작성날짜 (생성날짜)
    user_code INT,                               -- 유저코드 (포링키)
    product_code INT                             -- 상품코드 (포링키)
);

insert INTO comment (comment_text,user_code,product_code)
values ("이 음악 정말 좋은거같아요!",1,1);
insert INTO user_table (user_id, user_pwd, user_name, user_gender, user_phone, user_birthdaydata)
values("cotmdgns","123","채승훈","남","01086637996","19970109");
INSERT INTO product(product_type ,product_name ,product_price ,product_img ,product_explanation)
values ("레코드","음악이꺼지는무대","35000","123456","아하하하");



CREATE TABLE Used_comment ( /*댓글중고상품*/
    Used_comment_code VARCHAR(50) PRIMARY KEY,   -- 댓글번호
    Used_comment_text VARCHAR(255),               -- 텍스트
    Used_comment_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- 작성날짜 (생성날짜)
    user_code INT,                                -- 유저코드     (포링키)
    Used_product_code INT                           -- 중고상품코드 (포링키)
);

CREATE TABLE shopping_save(
	shopping_code INT primary key, 				-- 쇼핑 코드
    product_code INT,	 						-- 상품 코드		(포링키)
	Used_product_code INT,						-- 중고 상품 코드	(포링키)
	user_code INT								-- 유저 코드		(포링키)
);

CREATE TABLE user_order ( /* 주문및장바구니 */
    order_code INT PRIMARY KEY,                 -- 주문 코드
    product_code INT,                           -- 상품 코드		(포링키)
    Used_product_code INT,                      -- 중고 상품 코드	(포링키)
    user_code INT,		                        -- 유저 코드		(포링키)
    order_stateCode INT							-- 주문 상태코드 (0이면 임시저장 1이면 주문발송 2이면 배송중 3이면 배송완료 4이면 주문내역 등등..
);
CREATE TABLE address ( /*주소*/
    order_code INT,                   			-- 주문코드	(포링키)
    user_zip VARCHAR(20),                        -- 우편번호 158-8
    user_address_detail VARCHAR(50),              -- 주소 디테일 태전동
    user_phone VARCHAR(50), 					-- 전화번호
    user_details VARCHAR(50)					-- 세부사항
);


select * from user_order;




