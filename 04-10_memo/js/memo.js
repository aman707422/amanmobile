"use strict";

window.addEventListener("DOMContentLoaded", function () {
  if (typeof localStorage === "undefined") {
    window.alert("このブラウザはlocal storage機能が実装されていません");
    return;
  } else {
    viewStorage();
    saveLocalStorage();
    delLocalStorage();
    selectable();
    allClearLocalStorage();
    trashEvent();
  }
}, false);

// -----------------------------------
// 保存
// -----------------------------------
function saveLocalStorage() {
  const save = document.getElementById("save");
  save.addEventListener("click", function (e) {
    e.preventDefault();

    const key = document.getElementById("textKey").value;
    const value = document.getElementById("textMemo").value;

    if (key === "" || value === "") {
      Swal.fire({
        title: "Memo app",
        html: "KeyとMemoはいずれも必須です。",
        type: "error",
        allowOutsideClick: false
      });
      return;
    }

    let w_msg = "LocalStorageに[" + key + "][ " + value + " ]を保存しますか？";

    Swal.fire({
      title: "Memo app",
      html: w_msg,
      type: "question",
      showCancelButton: true
    }).then(function (result) {
      if (result.value === true) {
        localStorage.setItem(key, value);
        viewStorage();

        w_msg = "LocalStorageに[" + key + "][ " + value + " ]を保存しました。";

        Swal.fire({
          title: "Memo app",
          html: w_msg,
          type: "success",
          allowOutsideClick: false
        });

        document.getElementById("textKey").value = "";
        document.getElementById("textMemo").value = "";
      }
    });
  }, false);
}

// -----------------------------------
// 選択
// -----------------------------------
function selectable() {
  const select = document.getElementById("select");
  select.addEventListener("click", function (e) {
    e.preventDefault();
    selectCheckBox("select");
  }, false);
}

function selectCheckBox(mode) {
  let w_cnt = 0;
  const chkbox1 = document.getElementsByName("chkbox1");
  const table1 = document.getElementById("table1");
  let w_textKey = "";
  let w_textMemo = "";

  for (let i = 0; i < chkbox1.length; i++) {
    if (chkbox1[i].checked) {
      if (w_cnt === 0) {
        w_textKey = table1.rows[i + 1].cells[1].textContent;
        w_textMemo = table1.rows[i + 1].cells[2].textContent;
      }
      w_cnt++;
    }
  }

  document.getElementById("textKey").value = w_textKey;
  document.getElementById("textMemo").value = w_textMemo;

  if (mode === "select") {
    if (w_cnt === 1) return w_cnt;
    Swal.fire({
      title: "Error",
      html: "1つ選択してください。",
      type: "error",
      allowOutsideClick: false
    });
  }

  if (mode === "del") {
    if (w_cnt >= 1) return w_cnt;
    Swal.fire({
      title: "Error",
      html: "1つ以上選択してください。",
      type: "error",
      allowOutsideClick: false
    });
  }
}

// -----------------------------------
// 表示
// -----------------------------------
function viewStorage() {
  const list = document.getElementById("list");
  while (list.rows[0]) list.deleteRow(0);

  for (let i = 0; i < localStorage.length; i++) {
    const w_key = localStorage.key(i);

    const tr = document.createElement("tr");
    const td1 = document.createElement("td");
    const td2 = document.createElement("td");
    const td3 = document.createElement("td");
    const td4 = document.createElement("td");

    td1.innerHTML = "<input name='chkbox1' type='checkbox'>";
    td2.textContent = w_key;
    td3.textContent = localStorage.getItem(w_key);
    // ★ trash icon
    td4.innerHTML = "<img src='img/trash_icon.png' class='trash'>";

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);

    list.appendChild(tr);
  }

  $("#table1").tablesorter({ sortList: [[1, 0]] });
  $("#table1").trigger("update");
}

// -----------------------------------
// 削除（複数）
// -----------------------------------
function delLocalStorage() {
  const del = document.getElementById("delete");
  del.addEventListener("click", function (e) {
    e.preventDefault();

    const chkbox1 = document.getElementsByName("chkbox1");
    const table1 = document.getElementById("table1");

    const w_cnt = selectCheckBox("del");
    if (w_cnt >= 1) {
      Swal.fire({
        title: "Memo app",
        html: "LocalStorageから選択されている [" + w_cnt + "] 件を削除しますか?",
        type: "question",
        showCancelButton: true
      }).then(function (result) {
        if (result.value === true) {
          for (let i = 0; i < chkbox1.length; i++) {
            if (chkbox1[i].checked) {
              localStorage.removeItem(
                table1.rows[i + 1].cells[1].textContent
              );
            }
          }
          viewStorage();

          let w_msg = "LocalStorageから [ " + w_cnt + " ] 件を削除しました。";

          Swal.fire({
            title: "Memo app",
            html: w_msg,
            type: "success",
            allowOutsideClick: false
          });

          document.getElementById("textKey").value = "";
          document.getElementById("textMemo").value = "";
        }
      });
    }
  }, false);
}

// -----------------------------------
// 全削除
// -----------------------------------
function allClearLocalStorage() {
  const allClear = document.getElementById("allClear");
  allClear.addEventListener("click", function (e) {
    e.preventDefault();

    Swal.fire({
      title: "Memo app",
      html: "LocalStorageのデータをすべて削除します。<br>よろしいですか?",
      type: "question",
      showCancelButton: true
    }).then(function (result) {
      if (result.value === true) {
        localStorage.clear();
        viewStorage();

        let w_msg = "このページのLocalStorageのデータをすべて削除しました。";

        Swal.fire({
          title: "Memo app",
          html: w_msg,
          type: "success",
          allowOutsideClick: false
        });

        document.getElementById("textKey").value = "";
        document.getElementById("textMemo").value = "";
      }
    });
  }, false);
}

// -----------------------------------
// 🗑 トラッシュ削除（1件）
// -----------------------------------
function trashEvent() {
  const table1 = document.getElementById("table1");

  table1.addEventListener("click", function (e) {
    if (!e.target.classList.contains("trash")) return;

    const tr = e.target.closest("tr");
    const key = tr.children[1].textContent;
    const value = tr.children[2].textContent;

    let w_msg = "LocalStorageから[" + key + "][ " + value + " ]を削除しますか？";

    Swal.fire({
      title: "Memo app",
      html: w_msg,
      type: "warning",
      showCancelButton: true
    }).then(function (result) {
      if (result.value === true) {
        localStorage.removeItem(key);
        tr.remove();

        w_msg = "LocalStorageから[" + key + "][ " + value + " ]を削除しました。";

        Swal.fire({
          title: "Memo app",
          html: w_msg,
          type: "success",
          allowOutsideClick: false
        });
      }
    });
  }, false);
}
