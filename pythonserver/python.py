import socket




# def doMath():
#     num1 = 21
#     num2 = 10
#     print(num1 + num2)

# def makeHello(name):
#     return "hello " + name

# print(makeHello("Batman"))

# n = 0
# while True:
#     if n == 3:
#         break
#     print(n)
#     n = n + 1

# namesArray = ["John", "Sam", "Robot"]

# for i in namesArray:
#     print(i)

# numArray = [1, 7, 5, 8, 10, 15, 6]

# def sortNums(array):
#     for i in array:
#         print(i)

# sortNums(numArray)

# for n in "Banana":
#     print(n)

# word = "bananana"
# i = word.find("na")
# print(i)

# userNum = input("Enter a number")
# print(userNum)

file = open('random.txt')
for line in file:
    user = line.find("Carreejoh")
    if line.startswith('Cock'):
        continue
    if line.startswith('Login'):
        print("HUGE BALLS")
    if(user > 0):
        print(line)
    else:
        print("User not found here")

numArray = [9, 32, 23, 34, 6, 54 ,7]

print(numArray[2:4])

dict = {"Fri": 20, "Thu": 6, "Sat": 1}
dict["Thu"] = 13
dict["Sat"] = 2
dict["Sun"] = 9

print(dict)

counts = { 'quincy' : 1 , 'mrugesh' : 42, 'beau': 100, '0': 10}
print(counts.get('kris', 0))