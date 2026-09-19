class ApiResponse {
  constructor(statuscode,message="success",success){
    this.statuscode=statuscode
    this.message=message
    this.data=data
    this.success=statuscode<400

  }
}

export {ApiResponse}