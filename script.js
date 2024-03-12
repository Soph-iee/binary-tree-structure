"use strict";

const contactList = document.querySelector(".list"),
  contactNumber = document.querySelector(".contact-number"),
  contactName = document.querySelector(".contact-name"),
  searchBtn = document.getElementById("search-btn"),
  addBtn = document.getElementById("add-btn"),
  newName = document.getElementById("name"),
  newNumber = document.getElementById("number"),
  deleteBtns = contactList.querySelectorAll("button"),
  newContactForm = document.querySelector(".new-contact");

/////////////////functions
const openForm = function () {
  newContactForm.classList.toggle("display");
};
const searchList = function () {
  const input = document.getElementById("input");
  if (input.value) {
    contactList.innerHTML = "";
    bst.search(bst.root, input.value);
    input.value = "";
  }
};
const addContactFunction = function () {
  if (newName.value && newNumber.value) {
    bst.insert(newName.value, newNumber.value);
    newName.value = "";
    newNumber.value = "";
    contactList.innerHTML = "";
    bst.inOrder(bst.root);
    openForm();
  } else return;
};

const deleteContact = function (value) {
  bst.delete(value);
  contactList.innerHTML = "";
  return bst.inOrder(bst.root);
};

//////////////////////////
class Node {
  constructor(id, number) {
    this.id = id;
    this.number = number;
    this.left = null;
    this.right = null;
  }
}

class Contactlist {
  constructor() {
    this.root = null;
  }
  insert(id, number) {
    const newContact = new Node(id, number);
    if (this.root === null) {
      this.root = newContact;
    } else {
      this.insertNode(this.root, newContact);
    }
  }
  insertNode(root, newContact) {
    if (newContact.id < root.id) {
      if (root.left === null) {
        root.left = newContact;
      } else {
        this.insertNode(root.left, newContact);
      }
    } else {
      if (root.right === null) {
        root.right = newContact;
      } else {
        this.insertNode(root.right, newContact);
      }
    }
  }
  search(root, value) {
    if (!root) {
      return false;
    } else {
      if (root.id === value) {
        const liTag = `<li class="list-item">
          <div>
            <p class="contact-name">${root.id}</p>
            <p class="contact-number">${root.number}</p>
          </div>
           <button onclick='deleteContact(${JSON.stringify(
             root.id
           )})'>delete contact</button>
        </li>`;
        return (contactList.innerHTML += liTag);
      } else if (value < root.id) {
        return this.search(root.left, value);
      } else return this.search(root.right, value);
    }
  }
  inOrder(root) {
    if (root) {
      this.inOrder(root.left);
      //   console.log(root.id);
      contactList.innerHTML += `<li class="list-item">
              <div>
                <p class="contact-name">${root.id}</p>
                <p class="contact-number">${root.number}</p>
              </div>
               <button onclick='deleteContact(${JSON.stringify(
                 root.id
               )})'>delete contact</button>
            </li>`;
      this.inOrder(root.right);
    }
  }
  min(root) {
    let current = root;
    while (current.left !== null) {
      current = current.left;
    }
    return current;
  }
  // min(root) {
  //   if (!root.left) {
  //     return root;
  //   } else {
  //     return this.min(root.left);
  //   }
  // }
  delete(id) {
    this.root = this.deleteNode(this.root, id);
  }
  deleteNode(root, id) {
    if (root === null) {
      return root;
    }
    if (id < root.id) {
      root.left = this.deleteNode(root.left, id);
    } else if (id > root.id) {
      root.right = this.deleteNode(root.right, id);
    } else {
      // if (!root.right && !root.left) {
      //   return null;
      // }
      if (!root.left) {
        return root.right;
      }
      if (!root.right) {
        return root.left;
      }
      const successor = this.min(root.right);
      root.id = successor.id;
      root.right = this.deleteNode(root.right, successor.id);
    }
    return root;
  }
}
const bst = new Contactlist();

bst.insert("mary", 2);
bst.insert("dafe", 30);
bst.insert("angela", 46);
bst.insert("marie", 9087654343);
bst.insert("ella", 32);
bst.insert("praise", 9035685815);

////////////////////////////////////////eventlisteners
searchBtn.addEventListener("click", searchList);

addBtn.addEventListener("click", function (e) {
  e.preventDefault();
  addContactFunction();
});

bst.inOrder(bst.root);
// bst.delete("dafe");
// console.log(bst);
