from ast import While
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import RandomizedSearchCV
from sklearn.neighbors import KNeighborsClassifier
from sklearn import metrics
import numpy as np
import pandas as pd
from os.path import exists

"""

a=exists("client/public/uploads/Train.csv")
print(a)
b=exists("client/public/uploads/Test.csv")
print(b)

while (a ==False or b ==False):
    print("file doesn't exist")"""


df_train=pd.read_csv("client/Train.csv")
df_test=pd.read_csv("client/public/uploads/Test.csv")
df_train=df_train.dropna()
df_test=df_test.dropna()

y=df_train['Revenue']
del df_train['Revenue']
X=df_train
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.33, random_state=42)



'''K = 12
mean_acc = np.zeros((K-1))
std_acc = np.zeros((K-1))
for n in range(1,K):
    model = KNeighborsClassifier(n_neighbors=n).fit(X_train, y_train)
    prediction = model.predict(X_test)
    mean_acc[n-1] = metrics.accuracy_score(y_test, prediction)
print(mean_acc)'''



params = {"n_estimators": 500, 
    "max_depth": 17, 
    "min_samples_split": 4, 
    "min_samples_leaf": 2,  
    "ccp_alpha": 0,
    "random_state": 123,}
rf = RandomForestRegressor(**params)
rf = rf.fit(X_train, y_train)
y_pred = rf.predict(df_test)
y_pred=np.round(np.array(y_pred))
for i in range(y_pred.shape[0]) :
    y_pred[i]=int(y_pred[i])
k=[]
for x in y_pred :
    if x==1:
        k.append(True)
    else:
        k.append(False)
output= pd.DataFrame (k)
    

'''model = KNeighborsClassifier(n_neighbors=7).fit(X_train, y_train)
prediction = model.predict(df_test)
print(prediction)'''
df_test['Revenue'] =output
'''prediction'''
# print(df_test)
df_test.to_csv("client/public/result/output.csv")