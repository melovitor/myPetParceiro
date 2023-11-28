import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs, getDoc, doc, addDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

// Optionally import the services that you want to use
// import {...} from "firebase/database";
// import {...} from "firebase/functions";


const firebaseConfig = {
    apiKey: "AIzaSyAqys80kGjLb9EhOVVb_BWcY3YoMmPTcHM",
    authDomain: "mypet-9658b.firebaseapp.com",
    projectId: "mypet-9658b",
    storageBucket: "mypet-9658b.appspot.com",
    messagingSenderId: "105780164751",
    appId: "1:105780164751:web:2ec876c807a330af2198fa",
    measurementId: "G-50NJ71904D"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
})

export const db = getFirestore(app)
const storage = getStorage(app, "gs://mypet-9658b.appspot.com");;



export async function getItems(item, type, tag) {
    const search = collection(db, type);
    var q
    console.log('before', tag)
    if(!tag){
        q = query(search, where("name", "==", item));
    }else {
        q = query(search,
            where("name", "==", item),
            where("animal", "in", [tag, 'all'])
        );
    }
    const querySnapshot = await getDocs(q);
    const results = [];
    querySnapshot.forEach((doc) => {
        results.push({ id: doc.id, data: doc.data() });
    });

    return results;
}

export async function getUser(userEmail) {
    const search = collection(db, 'partnes');
    const q = query(search, where("email", "==", userEmail));
    const querySnapshot = await getDocs(q);
    const results = [];
    querySnapshot.forEach((doc) => {
        results.push({ id: doc.id, data: doc.data() });
    });

    return results;
}


export async function getCartUser(userId) {
    const search = collection(db, 'orders');
    const q = query(search, where("from", "==", userId));
    const querySnapshot = await getDocs(q);
    const results = [];
    querySnapshot.forEach((doc) => {
        results.push({ id: doc.id, data: doc.data() });
    });

    return results;
}

export async function getItemById(itemId) {
    const docRef = doc(db, 'products', itemId);
    const docSnap  = await getDoc(docRef);
    const results =  docSnap.data()
    return results;
}


export async function addDocument(doc, table) {
    const docRef  = await addDoc(collection(db, table), doc)
    return docRef.id
}

export async function getFourItemsFromDb() {
    const q = query(collection(db, "products"));
    const querySnapshot = await getDocs(q);

    const results = [];
    querySnapshot.forEach((doc) => {
        results.push({ id: doc.id, data: doc.data() });
    });

    return results.slice(0, 4);
}

export async function uploadImageAsync(uri) {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    try {
        const storageRef = ref(storage, `Images/image-${Date.now()}`);
        const result = await uploadBytes(storageRef, blob)
        blob.close()
        return await getDownloadURL(storageRef)
    } catch (error) {
        console.log(error);
    }
  }