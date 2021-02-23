const { rock, paper, scissor } = ((token) => {
  const createGame = (token, onStateChange) => {
    let state = {
      version: 0,
    };

    const fetchState = () => fetch(`/${token}/state`).then((res) => res.json());
    const submitAnswer = (answer) =>
      fetch(`/${token}/${answer}`).then((res) => res.json());

    let isFetching = false;
    const handle = setInterval(() => {
      if (isFetching) {
        return;
      }
      isFetching = true;
      fetchState()
        .then((newState) => {
          if (newState.version !== state.version) {
            state = onStateChange(newState, state);
          }
        })
        .finally(() => {
          isFetching = false;
        });
    }, 1000);

    return {
      submit: (choice) => submitAnswer(choice),
    };
  };

  const game = createGame(token, (newState, oldState) => {

  })

})(window.location.hash.slice(1));
