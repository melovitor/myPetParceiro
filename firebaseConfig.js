import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs, getDoc, doc, addDoc } from "firebase/firestore";

// Optionally import the services that you want to use
// import {...} from "firebase/database";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";


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
    const search = collection(db, 'users');
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