export default class WebRTC {
  constructor() {
    this._stunServerUrl = 'stun:stun.l.google.com:19302'
    this.pc = null
    this.stream = null
  }

  createConnection() {
    this.pc = new RTCPeerConnection({
      iceServers: [{ urls: this._stunServerUrl }]
    })
  }

  async setRemoteSDP(sdp) {
    return await this.pc.setRemoteDescription(sdp)
  }

  async createAnswerAndSetLocalSDP() {
    const answer = await this.pc.createAnswer()
    await this.pc.setLocalDescription(answer)
    return answer
  }

  async addCandidate(candidate) {
    await this.pc.addIceCandidate(candidate)
  }

  setIceCandidateListener(eventListener) {
    this.pc.onicecandidate = eventListener
  }

  setTrackListener(eventListener) {
    this.pc.ontrack = eventListener
  }

  async getLocalStream() {
    this.stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: { ideal: ['user', 'environment'] }
      },
      audio: true
    })
  }

  addTrackToConnection() {
    this.stream
      .getTracks()
      .forEach((track) => this.pc.addTrack(track, this.stream))
  }

  stopStream() {
    this.stream.getTracks().forEach((track) => track.stop())
  }
}
