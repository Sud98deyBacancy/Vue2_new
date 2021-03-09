let timer;
export default {
  async login(context, payload) {
return context.dispatch('auth', {
      ...payload,mode:'login'
    });
  },
  async signup(context, payload) {
   return context.dispatch('auth', {
      ...payload,mode:'signup'
    });
  },
  async auth(context,payload){
    const mode=payload.mode; 
    let url= 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCpSEwHCXqk7AhuCGXmDrojyWRrpLLHptk';
    if(mode==='signup'){
      url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCpSEwHCXqk7AhuCGXmDrojyWRrpLLHptk';
    }
    const response = await fetch(
      url,
      {
        method: 'POST', body: JSON.stringify({
          email: payload.email,
          password: payload.password,
          returnSecureToken: true
        })
      }
    );
    const responseData = await response.json();
if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to authenticate. Check your login data.');  throw error;
    }
    const expiresIn = +responseData.expiresIn * 1000;
    const expiryDate = new Date().getTime() + expiresIn;
    localStorage.setItem('token',responseData.idToken); 
    localStorage.setItem('userId',responseData.userId);
    localStorage.setItem('tokenExpiry',expiryDate);  
    timer=setTimeout(function(){
      context.dispatch('logout');
    },expiresIn);
    context.commit('setUser', {token: responseData.idToken, userId: responseData.localId});},
  tryLogin(context){
    const token=localStorage.getItem('token'); 
    const userId=localStorage.getItem('userId');
    const tokenExpiry=localStorage.getItem('tokenExpiry');
    const expiresIn = +tokenExpiry - new Date().getTime();
    if(expiresIn<0){ return;}
    timer = setTimeout(function(){context.dispatch('logout'); },expiresIn);
    if(token && userId){
      context.commit('setUser',{ token:token,userId:userId });
    }
  },
  logout(context) {
    localStorage.removeItem('token'); 
    localStorage.removeItem('userId');
    localStorage.removeItem('tokenExpiry');
    clearTimeout(timer);
    context.commit('setUser', {
      token: null,
      userId: null
    });
  }
};
