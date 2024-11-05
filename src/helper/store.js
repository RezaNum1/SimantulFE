import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      token: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoiNzEzODMxYmItMjFkZi00M2M2LWE0OTQtMmM0ZGJjYTMwYmQwIiwidXNlcm5hbWUiOiJtYWhhcmFuaS5mYXd3YXpAb2prLmNvbSJ9LCJleHAiOjE3MzA1NjE5MzgsImlhdCI6MTczMDU2MTAzOCwiaXNzIjoiZXhwaXJlLmNvbSJ9.Mg-tAjdE0ywfZ6mu4qaC_ur45BUCVSTrRAjcy3MevPcfmRjil-aBJkPmUjCKxEIgzchcDqI87osesfDNY3yL-JhbpWKi2SeXyBfD3TdYtVA4_t1tHaCgs35uOG4hGyICW5muvlrd_PT2hjEYAz2vomLGmwByhA6MzOFyoht08ZgYEsMO5Sfxvkt8BW74W6ZGHDsMEdlGU7OTz2adkDiNBVZUWp_TcClvHgnp5ZyVyz6Pkt6fgvUErRaELnnySEvQwvsM4MCK7y1nDvyh4jRZByHSzyFRUALQg2IF1MKWG66OIQkfh4WCGYmzlBaZepURwSxoZ4VxD5H910mYKRpSFnlZMuZ2sjdMWWfwkC_cQvwhPYNzyfDEm6jokcvWVSyGLqNLgSVVIfx2Bpg7bjq0RjUEf0tdYeEG7tC5p-R6oQh-J7Aq8lipFuoAuAbf5Zl63OI8OrKg4QV7K3X6CS0go32huexRR008nMaXnPq0fF1J6R5k_Qp9d2khB89Fg0q8m8jd4viVlBpVucduY06-3PslutUsPfCrdY2aMJ7pfnNwf6dXmY6q0BnXiS1Pj_jvdAs2OyKJXgS4ii2ZQa2eMeKb_bvA0zlms5ntCxGrgjcS6EpKdE9Y2HYLp7ET-xBgTl0GVY1f80Y6uI9iczY7PzPBEDzJw325mxdhB4n_lLs' // Your global variable
    };
  },
  mutations: {
    updateTokenVariable(state, newValue) {
      state.token = newValue;
    }
  }
});

export default store;
