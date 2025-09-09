package com.klef.todo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import com.klef.todo.entity.ToDo;
import com.klef.todo.service.ToDoService;

@RestController
@RequestMapping("/todoapi")
@CrossOrigin(origins="*")
public class ToDoController {

    @Autowired
    private ToDoService toDoService;

    @GetMapping("/")
    public String home() {
        return "ToDo API is running";
    }

    
    @PostMapping("/add")
    public ResponseEntity<ToDo> addToDo(@RequestBody ToDo todo) {
        ToDo savedToDo = toDoService.addToDo(todo);
        return new ResponseEntity<>(savedToDo, HttpStatus.CREATED);
    }

    
    @GetMapping("/all")
    public ResponseEntity<List<ToDo>> getAllToDos() {
        List<ToDo> todos = toDoService.getAllToDos();
        return new ResponseEntity<>(todos, HttpStatus.OK);
    }

   
    @GetMapping("/get/{id}")
    public ResponseEntity<?> getToDoById(@PathVariable int id) {
        ToDo todo = toDoService.getToDoById(id);
        if (todo != null) {
            return new ResponseEntity<>(todo, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("ToDo with ID " + id + " not found.", HttpStatus.NOT_FOUND);
        }
    }

   
    @PutMapping("/update")
    public ResponseEntity<?> updateToDo(@RequestBody ToDo todo) {
        ToDo updated = toDoService.updateToDo(todo);
        if (updated != null) {
            return new ResponseEntity<>(updated, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Cannot update. ToDo with ID " + todo.getId() + " not found.", HttpStatus.NOT_FOUND);
        }
    }




    
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteToDo(@PathVariable int id) {
        ToDo existing = toDoService.getToDoById(id);
        if (existing != null) {
            toDoService.deleteToDoById(id);
            return new ResponseEntity<>("ToDo with ID " + id + " deleted successfully.", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Cannot delete. ToDo with ID " + id + " not found.", HttpStatus.NOT_FOUND);
        }
    }
}
