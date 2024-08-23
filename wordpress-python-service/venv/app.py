from flask import Flask, request, jsonify

app = Flask(__name__)

# Example processing function
def process_data(raw_data):
    # Perform data processing here
    # For example, let's just reverse the post titles
    processed_data = []
    for item in raw_data:
        processed_item = {
            "id": item['id'],
            "title": item['title']['rendered'][::-1],  # Reverse the title as an example
            "content": item['content']['rendered']
        }
        processed_data.append(processed_item)
    return processed_data

# Endpoint to receive and process data
@app.route('/process-data', methods=['POST'])
def process_data_endpoint():
    try:
        raw_data = request.json
        processed_data = process_data(raw_data)
        return jsonify(processed_data)
    except Exception as e:
        return str(e), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
