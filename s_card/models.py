from django.db import models

class Student(models.Model):
    fname = models.CharField(max_length=100)
    lname = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    address = models.TextField()

    def __str__(self):
        return f"{self.fname} {self.lname}"
