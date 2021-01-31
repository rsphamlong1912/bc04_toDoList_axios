function TaskService() {
    //Lấy danh sách Task
    this.getListTaskService = function () {
      return axios({
        url: "https://600bc4cd38fd25001702cb27.mockapi.io/api/TASKS",
        method: "GET",
      });
    };

    //Thêm Task
    this.addTaskService = function (task) {
        return axios({
          url: "https://600bc4cd38fd25001702cb27.mockapi.io/api/TASKS",
          method: "POST",
          data: task,
        });
    };

    //Xoá Task
    this.deleteTaskService = function(id){
        return axios({
            url: `https://600bc4cd38fd25001702cb27.mockapi.io/api/TASKS/${id}`,
            method: "DELETE",
        });
    };

    //lấy task thông qua id
    this.getTaskByIdService = function(id){
        return axios({
            url: `https://600bc4cd38fd25001702cb27.mockapi.io/api/TASKS/${id}`,
            method: "GET",
        })
    };

    //cập nhật trạng thái task
    this.updateTaskService = function (task){
        return  axios({
            url: `https://600bc4cd38fd25001702cb27.mockapi.io/api/TASKS/${task.id}`,
            method: "PUT",
            data: task,
          });
    };



    
}