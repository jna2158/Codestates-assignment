describe("Chatterbox Client", () => {
  it("app이라는 이름의 객체가 존재해야 합니다", () => {
    expect(app).to.be.an("object");
  });

  describe("init", () => {
    it("init 이라는 이름의 메소드가 존재해야 합니다", () => {
      expect(app.init).to.be.ok;
    });
  });

  describe("app behavior", () => {
    var fetchSpy;

    before(() => {
      fetchSpy = sinon.stub(window, "fetch");
      window.fetch.returns(
        Promise.resolve({
          json: () => ({
            results: [
              {
                id: -1,
                username: "test",
                text: "message",
                date: "2017-07-28T03:54:21.134",
                roomname: "lobby"
              }
            ]
          })
        })
      );
      app.init();
    });

    beforeEach(() => {
      fetchSpy.resetHistory();
    });

    describe("메시지 조회", () => {
      it("fetch라는 메소드가 존재해야 합니다", () => {
        expect(app.fetch).to.be.ok;
      });

      it("fetch API를 통해 GET 요청을 제출해야 합니다 (fetch 메소드는 DOM을 조작하지 않아야 합니다)", done => {
        let url;

        app.fetch();
        // console.log(window.fetch.args)
        expect(window.fetch.calledOnce).to.be.true;
        if (window.fetch.args[0][0]) {
          url = window.fetch.args[0][0];
        }

        expect(url).to.equal(app.server);
        done();
      });
    });

    describe("메시지 추가", () => {
      it("send라는 메소드가 존재해야 합니다", () => {
        expect(app.send).to.be.ok;
      });

      it("fetch API를 통해 POST 요청을 제출해야 합니다 (send 메소드는 DOM을 조작하지 않아야 합니다)", done => {
        let option;

        app.send([]);
        if (window.fetch.args[0][1]) {
          option = window.fetch.args[0][1].method;
        }
        expect(option.toUpperCase()).to.equal("POST");
        expect(window.fetch.calledOnce).to.be.true;

        done();
      });

      it("요청과 함께 메시지를 정확하게 전달해야 합니다", done => {
        const message = {
          username: "김코딩",
          text: "나의 채팅 메시지",
          roomname: "로비"
        };
        let option;

        app.send(message);
        if (window.fetch.args[0][1]) {
          option = window.fetch.args[0][1].body;
        }
        expect(JSON.parse(option)).to.deep.equal(message);
        done();
      });
    });

    describe("DOM 조작 메소드", () => {
      it("clearMessages라는 메소드는 DOM에서 메시지를 지웁니다", () => {
        document.querySelector("#chats").innerHTML =
          "<div>app.clearMessages가 작동하지 않습니다.</div>";

        app.clearMessages();
        expect(document.querySelector("#chats").children.length).to.equal(0);
      });

      it("renderMessage라는 메소드는 DOM에 메시지 하나를 추가합니다", () => {
        const message = {
          username: "Mel Brooks",
          text: "Never underestimate the power of the Schwartz!",
          roomname: "lobby"
        };

        app.renderMessage(message);
        expect(document.querySelector("#chats").children.length).to.equal(1);
      });
    });
  });
});
