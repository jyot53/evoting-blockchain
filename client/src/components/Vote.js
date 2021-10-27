import React from "react";

const Vote = () => {
  return (
  
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <h1 class="text-center">Election Voting DAPP</h1>
            <hr />
            <br />
            <div id="loader">
              <p class="text-center">Loading...</p>
            </div>
            <div id="content" class="text-center">
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">ID#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Votes</th>
                  </tr>
                </thead>
                <tbody id="candidatesResults"></tbody>
              </table>
              <hr />
              <form>
                <div class="form-group">
                  <label for="candidatesSelect">Select Candidate</label>
                  <select class="form-control" id="candidatesSelect"></select>
                </div>
                <button type="submit" class="btn btn-primary btn-lg">
                  VOTE
                </button>
                <hr />
              </form>
              <p id="accountAddress" class="text-center"></p>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Vote;
