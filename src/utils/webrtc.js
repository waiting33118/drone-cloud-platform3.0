export const webrtc = {
  createPeerConnection () {
    return new RTCPeerConnection({
      iceServers: [{
        urls: 'stun:stun.l.google.com:19302'
      }]
    })
  },

  async getLocalMedia () {
    return await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: ['environment', 'user'],
        width: 640,
        height: 720
      },
      audio: true
    })
  }

}
