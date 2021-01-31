//var taskList = new TaskList();
//var validation = new Validation();
var service = new TaskService();
var isLoading = false;

//Hàm kiểm tra loading
function loading(isLoading) {
  if (isLoading) {
      getEle('loader').style.display = "block";
  } else {
      getEle('loader').style.display = "none";
  }
}

function getEle(id) {
    return document.getElementById(id);
}

function layDanhSachTask() {
  loading(true);
  service
    .getListTaskService()
    .then(function (result) {
      //console.log(result.data);
      loading(false);
      taoBang(result.data);
    })
    .catch(function (err) {
      console.log(err);
    });
}

layDanhSachTask();

//Thêm task 
getEle("addItem").addEventListener("click", function(){
    loading(true);
    var nameTask = getEle("newTask").value;
    //var idTask = Math.random();
    var status = "toDo";
    var newTask = new Task("",nameTask,status);
    service.addTaskService(newTask)
    .then(function(result){
      loading(false);
      layDanhSachTask();
      //alert("Add thành công!");
      getEle("newTask").value = "";
    })
    .catch(function(err){
      console.log(err);
    });
});


//Xoá task
function xoaTask(id) {
  loading(true);
  service.deleteTaskService(id)
    .then(function (result){
      loading(false);
      layDanhSachTask();
    })
    .catch(function (err){
      console.log(err);
    });
}


//Đổi trạng thái
function changeStt(id){
  loading(true);
  service.getTaskByIdService(id)
    .then(function (result){
      //đổi trạng thái stt
      if (result.data.status === "toDo"){
        result.data.status = "completed";
      }else{
        result.data.status = "toDo";
      }
      return kq = result.data,
      //cập nhât
      service.updateTaskService(kq)
        .then(function (result){
        //alert("Đổi trạng thái thành công!");
        loading(false);
        layDanhSachTask();
        })
        .catch(function (err){
          console.log(err);
        })
    })
    .catch(function (err){
      console.log(err);
    });
}

// // Cập nhật task 
// function updateTask(id){
//   var task = changeStt(id);
//   console.log(task);
// };

//tạo khung
function hienThi(arr) {
  return `<li>
      <span>${arr.nameTask}</span>
      <div class="buttons">
        <button class="remove" onclick="xoaTask(${arr.id})"><i class="fa fa-trash-alt"></i></button>
        <button class="complete" onclick="changeStt(${arr.id})">
          <i class="far fa-check-circle"></i>
          <i class="fas fa-check-circle"></i>
        </button>
      </div>
    </li>`;
}

function taoBang(arr) {
    var content_todo = "";
    var content_compt = "";
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].status === "toDo") {
        content_todo += hienThi(arr[i]);
      } else if (arr[i].status === "completed"){
        content_compt += hienThi(arr[i]);
      }
    }
    getEle("todo").innerHTML = content_todo;
    getEle("completed").innerHTML = content_compt;
}


