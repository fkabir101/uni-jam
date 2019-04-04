import axios from "axios";

export default {
  createEvent: function (eventData) {
    return axios.post('/api/events/create', eventData);
  },
  getEvents: function () {
    return axios.get("/api/events/get");
  },
  getSortedEvents: function () {
    return axios.get("/api/events/getsorted");
  },
  getEventById: function (id) {
    return axios.get('/api/events/' + id);
  },
  deleteEvent: function (id) {
    return axios.delete("/api/events/deleteEvent/"+ id);
  },
  login: function(loginCreds) {
    return axios.post('/api/users/login', loginCreds);
  },
  loginCheck: function() {
    return axios.get('/api/users/login');
  },
  logout: function() {
    return axios.get('/api/users/logout');
  },
  //to delete account
  remove: function() {
    return axios.delete('/api/users/remove');
  },
  removeCreatedEvents: function() {
    return axios.delete('api/events/removeByCreatorId');
  },
  register: function(userInfo) {
    return axios.post("/api/users/register", userInfo);
  },
  findByUsername: function(userInfo) {
    return axios.get("/api/users/findByUsername", userInfo);
  },
  attend: function(attendInfo){
    return axios.put('/api/events/attend', attendInfo);
  },
  leave: function(attendInfo){
    return axios.put("/api/events/leave", attendInfo);
  },
  search: function(search){
    return axios.get(`/api/events/search`, {params: search})
  },
  //finds particpant route goes to api/events then look for 'user'
  findPart: function(search) {
    return axios.get(`/api/events/user`)
  },
  update: function(id, updateData){
    return axios.put(`/api/events/update/${id}`, updateData);
  },
  getUsername: function(username){
    return axios.get("/api/users/findByUsername/"+username)
  },
  invite: function(email, pageLink, user){
    const emailData = {
      email : email,
      link : pageLink,
      sender: user
    }
    return axios.post("/api/email/invite/", emailData);
  }
}