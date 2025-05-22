class typicode {
  constructor() {
    this.baseUrl = 'https://jsonplaceholder.typicode.com';
  }

  async getPosts() {
    const response = await fetch(`${this.baseUrl}/posts`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  }

  async getPost(id) {
    const response = await fetch(`${this.baseUrl}/posts/${id}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  }
}