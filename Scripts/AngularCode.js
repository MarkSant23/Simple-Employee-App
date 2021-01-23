var app = angular.module("myApp", []);
app.controller("myCtrl", ($scope, $http) => {
    //debugger;
    $scope.InsertData = () => {
        var Action = document.getElementById("btnSave").getAttribute("value");
        if (Action == "Submit") {
            $scope.Employe = {};
            $scope.Employe.Emp_Name = $scope.EmpName;
            $scope.Employe.Emp_City = $scope.EmpCity;
            $scope.Employe.Emp_Age = $scope.EmpAge;
            $http({
                method: "post",
                url: "http://localhost:54487/Employee/Insert_Employee",
                datatype: "json",
                data: JSON.stringify($scope.Employe)
            }).then((response) => {
                alert(response.data);
                $scope.GetAllData();
                $scope.EmpName = "";
                $scope.EmpCity = "";
                $scope.EmpAge = "";
            })
        } else {
            $scope.Employe = {};
            $scope.Employe.Emp_Name = $scope.EmpName;
            $scope.Employe.Emp_City = $scope.EmpCity;
            $scope.Employe.Emp_Age = $scope.EmpAge;
            $scope.Employe.Emp_Id = document.getElementById("EmpID_").value;
            $http({
                method: "post",
                url: "http://localhost:54487/Employee/Update_Employee",
                datatype: "json",
                data: JSON.stringify($scope.Employe)
            }).then((response) => {
                alert(response.data);
                $scope.GetAllData();
                $scope.EmpName = "";
                $scope.EmpCity = "";
                $scope.EmpAge = "";
                document.getElementById("btnSave").setAttribute("value", "Submit");
                document.getElementById("btnSave").style.backgroundColor = "cornflowerblue";
                document.getElementById("spn").innerHTML = "Add New Employee";
            })
        }
    }
    $scope.GetAllData = () => {
        $http({
            method: "get",
            url: "http://localhost:54487/Employee/Get_AllEmployee"
        }).then((response) => {
            $scope.employees = response.data;
        }, () => {
            alert("Error Occur");
        })
    };
    $scope.DeleteEmp = (Emp) => {
        $http({
            method: "post",
            url: "http://localhost:54487/Employee/Delete_Employee",
            datatype: "json",
            data: JSON.stringify(Emp)
        }).then((response) => {
            alert(response.data);
            $scope.GetAllData();
        })
    };
    $scope.UpdateEmp = (Emp) => {
        document.getElementById("EmpID_").value = Emp.Emp_Id;
        $scope.EmpName = Emp.Emp_Name;
        $scope.EmpCity = Emp.Emp_City;
        $scope.EmpAge = Emp.Emp_Age;
        document.getElementById("btnSave").setAttribute("value", "Update");
        document.getElementById("btnSave").style.backgroundColor = "Yellow";
        document.getElementById("spn").innerHTML = "Update Employee Information";
    }
})  
