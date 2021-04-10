if (typeof window === 'undefined') {
  // for node env
  const fs = require('fs');
  const path = require('path');
  const cwd = process.cwd();
  const { JSDOM } = require('jsdom');
  const { expect } = require('chai');
  require('mocha');

  const myLibrary = fs.readFileSync(path.join(cwd, '/fix_me.js'), {
    encoding: 'utf-8',
  });
  const html = fs.readFileSync(path.join(__dirname, '/test.html'));

  let window;
  window = new JSDOM(html, { runScripts: 'dangerously' }).window;
  const script = window.document.createElement('script');
  script.textContent = myLibrary;

  window.document.body.appendChild(script);

  test(window, expect);
} else {
  // for browser env
  var expect = chai.expect;
  test(window, expect);
}

// ----------- TEST CODE HERE -----------
// 여기서부터 테스트 코드가 시작됩니다. 이 라인 위로는 신경쓰지 않아도 좋습니다!

function test(window, expect) {
  describe('<ul id="root"> 안에 tree view를 구성합니다', () => {
    const root = window.document.getElementById('root');

    it('ul#root 엘리먼트가 존재해야 합니다', () => {
      expect(root).to.exist;
    });

    it('ul#root 엘리먼트 안에 tree view를 구현해야 합니다', () => {
      expect(root.children).to.exist;
      expect(root.children.innerHTML).to.not.equal('');
    });
  });

  describe('menu 데이터를 사용해 tree view를 구성합니다', () => {
    const root = window.document.getElementById('root');

    it('ul#root 엘리먼트 안에 카테고리(음료, 음식, 굿즈, 카드)를 렌더링할 4개의 li 엘리먼트가 있어야 합니다', () => {
      expect(root.children.length).to.equal(4);

      const categories = root.children;
      Array.from(categories).forEach(function (category) {
        expect(category.tagName.toLowerCase()).to.equal('li');
      });
    });

    it('카테고리(음료, 음식, 굿즈, 카드) 엘리먼트 안에는 각각 자식 노드를 보여주고 감춰줄 checkbox가 존재해야 합니다', () => {
      const categories = root.children;
      Array.from(categories).forEach(function (category) {
        const input = category.children[0];
        expect(input.tagName.toLowerCase()).to.equal('input');
        expect(input.type).to.equal('checkbox');
      });
    });

    it('음료, 음식, 굿즈, 카드 카테고리 이름(name)을 span 태그로 감싸야 합니다', () => {
      function checkSpan(htmlTag, name) {
        for (let i = 0; i < htmlTag.length; i++) {
          if (htmlTag[i].matches('span')) {
            if (htmlTag[i].textContent === name) {
              return true;
            }
          }
        }
        return false;
      }

      const drinks = root.children[0].children;
      const foods = root.children[1].children;
      const goods = root.children[2].children;
      const cards = root.children[3].children;
      expect(checkSpan(drinks, '음료')).to.be.true;
      expect(checkSpan(foods, '음식')).to.be.true;
      expect(checkSpan(goods, '굿즈')).to.be.true;
      expect(checkSpan(cards, '카드')).to.be.true;
    });

    it('자식 노드가 없는 데이터의 경우, li 엘리먼트 안에 단순히 이름(name)만 표시합니다. (checkbox 및 span, ul을 포함하면 안됩니다)', () => {
      const cardItems = root.children[3].querySelector('ul').children;
      const cardItemNames = ['10000원권', '30000원권', '50000원권', '100000원권'];
      expect(cardItems.length).to.equal(cardItemNames.length);

      Array.from(cardItems).forEach(function (liElement, i) {
        expect(liElement.textContent).to.equal(cardItemNames[i]);
        expect(liElement.outerHTML).not.to.include('input');
        expect(liElement.outerHTML).not.to.include('span');
        expect(liElement.outerHTML).not.to.include('ul');
      });
    });

    it('자식 노드가 있는 데이터의 경우, li 엘리먼트 아래에 자식 노드를 렌더링할 새로운 ul이 존재해야 합니다 (1)', () => {
      function hasUl(children) {
        return Array.from(children).some(function (element) {
          return element.matches('ul');
        });
      }

      const drinks = root.children[0].children;
      const foods = root.children[1].children;
      const goods = root.children[2].children;
      const cards = root.children[3].children;

      expect(hasUl(drinks)).to.be.true;
      expect(hasUl(foods)).to.be.true;
      expect(hasUl(goods)).to.be.true;
      expect(hasUl(cards)).to.be.true;
    });

    it('자식 노드가 있는 데이터의 경우, li 엘리먼트 아래에 자식 노드를 렌더링할 새로운 ul이 존재해야 합니다 (2)', () => {
      function hasUl(children) {
        return Array.from(children).some(function (element) {
          return element.matches('ul');
        });
      }

      const coldbrews = root.children[0].querySelector('ul').children[0].children;
      const breads = root.children[1].querySelector('ul').children[0].children;

      expect(hasUl(coldbrews)).to.be.true;
      expect(hasUl(breads)).to.be.true;
    });

    it('type 속성이 item인 객체는 li 태그로 name 속성값을 감싸주어야 합니다', () => {
      function traverseDom(node) {
        for (let i = 0; i < node.length; i++) {
          if (node[i].children.length > 0) {
            traverseDom(node[i].children);
          } else {
            if (node[i].matches('li') && liNameList.includes(node[i].textContent)) {
              liNameList.splice(liNameList.indexOf(node[i].textContent), 1);
              count++;
            }
          }
        }
      }

      const liNameList = [
        '나이트로 콜드 브루',
        '돌체 콜드 브루',
        '제주 비자림 콜드 브루',
        '콜드 브루',
        '애플 쿠키 크림 프라푸치노',
        '더블 에스프레소 칩 프라푸치노',
        '모카 프라푸치노',
        '피스타치오 크림 프라푸치노',
        '망고 바나나 블렌디드',
        '딸기 요거트 블렌디드',
        '자몽 셔벗 블렌디드',
        '피치 & 레몬 블렌디드',
        '라임 패션 티',
        '민트 블렌드 티',
        '아이스 유스베리 티',
        '아이스 캐모마일 블렌드 티',
        '한방에 쭉 감당',
        '파이팅 청귤',
        '딸기주스',
        '도와주 흑흑',
        '트러플 미니 스콘',
        '보늬밤 몽블랑 데니쉬',
        '고소한 치즈 베이글',
        '미니 클래식 스콘',
        '밀당 에그 타르트',
        '마스카포네 티라미수 케이크',
        '블루베리 쿠키 치즈 케이크',
        '부드러운 생크림 카스텔라',
        '애플 까망베르 샌드위치',
        '트리플 머쉬룸 치즈 샌드위치',
        '로스트 치킨 샐러드 밀 박스',
        'B.E.L.T 샌드위치',
        '하루 한 컵 RED',
        '한라봉 가득 핸디 젤리',
        '리저브 초콜릿 세트',
        '로스티드 아몬드 앤 초콜릿',
        '마카롱',
        '자일리톨 캔디 크리스탈 민트',
        '자바 칩 유기농 바닐라 아이스크림',
        '넛츠 초콜릿 아포가토',
        '바닐라 아포가토',
        '우리 한글 블랙 머그 473ml',
        '서울 투어 머그 355ml',
        '스타벅스 1호점 머그 400ml',
        '서울 제주 데이머그 세트',
        'SS 부산 투어 텀블러 355ml',
        'SS 블랙 헤리티지 오드리 텀블러 355ml',
        'SS 에치드 실버 텀블러 473ml',
        '리저브 오렌지 카드 홀더',
        '스타벅스 1호점 에코백',
        '스타벅스 1호점 랩탑 파우치',
        '10000원권',
        '30000원권',
        '50000원권',
        '100000원권',
      ];
      let count = 0;
      traverseDom(root.children);

      expect(count).to.equal(55);
      expect(liNameList.length).to.equal(0);
    });
  });
}
