const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token:null,
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			
			refreshStore: () => {
				if (!getStore().token && sessionStorage.getItem("token")) {
					const token = sessionStorage.getItem("token");


					if (token !== "undefined" && token !== null) {
						setStore({ token: token });
					}
				}
				if (!getStore().user && sessionStorage.getItem("user")) {
					const user = sessionStorage.getItem("user");
					if (user !== "undefined" && user !== null) {
						console.log(user)
						setStore({ user: JSON.parse(user) });
					}
				}
			},

			logout: () =>{
				sessionStorage.removeItem("token");
				console.log("Login out");
				setStore({token:null});
			}, 

			login: async (email, password) => {
				const opts = {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(
						{
							"email": email,
							"password": password
						})
				}

				return fetch(process.env.BACKEND_URL + "api/token", opts)

					.then(resp => {
						if (resp.status === 200) return resp.json();
						else return false
					})
					.then(data => {
						if (data) {
							console.log("this came from the backend", data)
							sessionStorage.setItem("token", data.access_token);
							sessionStorage.setItem("user", JSON.stringify(data.user));
							setStore({ token: data.access_token, user: data.user })
							getActions().getUserDetails()

						}
					})
					.catch(error => {
						console.log("There was an error during login: ", error)
						return false
					})
			},

			signup: async (name, email, password) => {
				const opts = {
					method: "POST",

					headers: {
						"Content-Type": "application/json"
					},

					body: JSON.stringify(
						{
							"name": name,
							"email": email,
							"password": password
						}
					)
				}

				return fetch(process.env.BACKEND_URL + "api/signup", opts)
					.then(resp => {
						if (resp.status === 200) {
							return resp.json();
						}
						else { return false; }
					})
					.then(data => {
						console.log("sign up successful", data)
						return true;
					})
					.catch(error => {
						console.log("There was an error during signup.", error)
						return false;
					})
			},

			getMessage:  () => {
				const store = getStore();
				const opts = {
					headers: {
						"Authorization": "Bearer" + store.token
					}
				};

				
					// fetching data from the backend
					fetch ("https://upgraded-space-orbit-4j776j77qp7q2799p-3001.app.github.dev/api/hello", opts)
					.then(resp => resp.json())
					.then(data =>setStore({message: data.message}))
					.catch(error => console.log("Error loading message from backend", error));
			
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
