from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/process', methods=['POST'])
def process_data():
    try:
        # Extract data from the request
        data = request.json.get('data')

        # processing logic
        processed_data = {
            "processed": data,
            "message": "Data processed successfully"
        }

        # Return processed_data
        return jsonify(processed_data)
    
    except Exception as e:
        # Handle exceptions
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
